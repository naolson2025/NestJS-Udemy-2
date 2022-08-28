import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  // ExecutionContext is the request, but it can be used for multiple protocols
  // http, websockets, etc
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // will return true/false which determines if the app/controller/route can be accessed
    return request.session.userId;
  }
}
