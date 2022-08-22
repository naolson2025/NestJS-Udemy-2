import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

// Injectable marks the class for registration inside the dependancy
// injection container. Since this is a dependancy to other classes.
@Injectable()
export class MessagesService {
  // by adding public here it automatically adds messagesRepo as
  // a dependency to the class. Therefore no need to have this line of code
  // in the constructor
  // this.messagesRepo = repo
  constructor(public messagesRepo: MessagesRepository) {}

  async findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
}
