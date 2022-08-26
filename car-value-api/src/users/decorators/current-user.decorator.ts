import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// This custom decorator will be used fetch the current user by id
// because we will need to get the current user in many spots, we
// reduce code by making that logic reusable in a decorator

// we cannot reach into the dependancy injection system here
// which creates a challenge because we want to use the user.service to fetch the user
// since we can't do that the workaround is to create an interceptor too
export const CurrentUser = createParamDecorator(
  // ExecutionContext is the incoming request, could be http, websocket
  // or any other type of incoming request
  // data is going to be any argument provided to the custom decorator
  // ex: @CurrentUser('here is some data'). data = 'here is some data'
  // here we are going to set data's type to never because we're not using it
  // for this decorator
  (data: never, context: ExecutionContext) => {
    // to get the incoming request
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
