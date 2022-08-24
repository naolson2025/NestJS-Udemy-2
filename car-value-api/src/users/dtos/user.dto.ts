import { Expose } from 'class-transformer';

export class UserDto {
  // Expose means this element can be sent to back to the client
  // We do not want to expose private info like password
  @Expose()
  id: number;

  @Expose()
  email: string;
}
