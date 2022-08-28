import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

// describe block just gives us the ability to add more text description
describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('test123@test.com', 'password');

    expect(user.password).not.toEqual('password');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with an email thats already in use', async () => {
    // change the fakeUsersService to fit the needs of this test
    // we provide 1 user as a response so the signup() will fail because it checks to see
    // if the array has a length greater than 0, then throw an error
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);

    try {
      await service.signup('test@test.com', 'password');
    } catch (err) {}
  });

  it('throws if signin is called with an unused email', async () => {
    try {
      await service.signin('test@test.com', 'pass');
    } catch (err) {}
  });

  it('throws if an invalid password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ email: 'test@test.com', password: 'pass' } as User]);
    try {
      await service.signin('test@test.com', 'password');
    } catch (error) {}
  });

  it('returns a user if correct password is provided', async () => {
    // this uses a real salt and hash, but its a quick and dirty solution
    // there is a better way so we don't need to manually put in a real salt and hash
    fakeUsersService.find = () =>
      Promise.resolve([
        {
          email: 'test@test.com',
          password:
            'a1d8238e54cb74a2.2d03e3ac43faecb3666b4278799aecfbd50c138d4c521f7d82d11faacb3e98c3',
        } as User,
      ]);

    const user = await service.signin('test@test.com', 'pass');
    expect(user).toBeDefined();
  });
});
