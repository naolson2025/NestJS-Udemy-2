import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;

  constructor() {
    // DONT do this on real app, use dependancy injection
    this.messagesService = new MessagesService();
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  // We can extract the body from the client request using the @Body decorator
  @Post()
  createMessage(@Body() body: CreateMessageDTO) {
    return this.messagesService.create(body.content);
  }

  // We can extract parameters from the url request using the @Param decorator
  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }
}
