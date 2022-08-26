import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // @InjectRepository(User) this tells the dependency injection system that we
  // need the User repository. This decorator is required because User is a generic type
  // Repository<User> type annotation for typeorm User
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // The create function makes an instance of a User entity
    const user = this.repo.create({ email, password });
    // the save() function adds the user instance to the DB
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    // this will return one value or null
    // findOne() is a built in function on the TypeORM repository api
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    // will return an array of all matching search criteria
    // if there are no results we will get back an empty array
    // this is a built in function on the TypeORM repository api
    return this.repo.find({ where: { email } });
  }

  // Partial is a Typescript annotation that says it can have some of the User properties
  // here we fetch the user we want then save the changes
  // this is somewhat inefficient because it makes 2 calls to the DB.
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      // we don't want to use HTTP specific errors because websockets won't pick up the error
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    // repo.delete() works on the DB
    // repo.remove() works on an entity
    // so first we fetch the user, second remove. This way we can use the entity hooks
    return this.repo.remove(user);
  }
}
