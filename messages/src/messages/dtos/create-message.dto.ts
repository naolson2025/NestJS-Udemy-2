import { IsString } from 'class-validator';

// This file lists out the properties we expect the request body to have
// when a request comes to the messages controller
export class CreateMessageDTO {
  // this decorater makes sure that "content"is a string
  @IsString()
  content: string;
}
