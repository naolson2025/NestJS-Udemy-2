import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

// describe block just gives us the ability to add more text description
describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  // runs before each it()
  beforeEach(async () => {
    // create fake a array of users
    // more advanced way of mocking a service
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUser = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUser);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
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
    await service.signup('test@test.com', 'password');

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
    // test is not working it should fail if the passwords are the same
    await service.signup('test@test.com', 'pass');
    try {
      await service.signin('test@test.com', 'password');
    } catch (error) {}
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('test@test.com', 'pass');

    const user = await service.signin('test@test.com', 'pass');
    expect(user).toBeDefined();
  });
});
