import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDTO } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {}

  // We can extract the body from the client request using the @Body decorator
  @Post()
  createMessage(@Body() body: CreateMessageDTO) {
    console.log(body);
  }

  // We can extract parameters from the url request using the @Param decorator
  @Get('/:id')
  getMessage(@Param('id') id: string) {
    console.log(id);
  }
}
