import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

// its hard to add type safety here because we could
// receive any dto so we'll just set it to recieve any class
interface ClassConstructor {
  new (...args: any[]): {};
}

// Create a custom decorator
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

// implements, creates a new class that satisfies all requirements from an
// abstract class/interface
// this is different than extends, which makes a subclass, not a new class
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // run something before a request is handled by the request handler
    // console.log('Im running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        // run something before the response is sent out
        // console.log('running after the response is sent', data);
        // plainToInstance() turns our data into an instance of UserDto
        // Which then gets validated
        return plainToInstance(this.dto, data, {
          // values that are not on user.dto.ts will not be sent to the client
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
