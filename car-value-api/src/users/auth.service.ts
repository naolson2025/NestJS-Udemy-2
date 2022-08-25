import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
// The crypto package is built in nodeJS
import { randomBytes, scrypt as _scrypt } from 'crypto';
// util is built in nodeJS
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // see if email is already in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    // hash the user's password
    // Generate a salt, gives us 8 random bytes which are 1s and 0s
    // toString('hex') changes the 1s and 0s to characters
    const salt = randomBytes(8).toString('hex');
    // hash the salt and password together, 32 is the output size of the hash
    // wrap in () as Buffer to help typescript because it doesn't know what scrypt returns
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // join the hashed result, separater character, and the salt together
    // need to convert to string hex because Buffer is Bytes
    const result = salt + '.' + hash.toString('hex');
    // create new user and save it
    const user = await this.usersService.create(email, result);
    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    // look for email in DB
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // look at the password and split it based on '.' to get salt
    const [salt, storedHash] = user.password.split('.');
    // hash thr provided pass + salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
