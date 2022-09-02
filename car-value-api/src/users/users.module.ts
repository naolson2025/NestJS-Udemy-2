import { MiddlewareConsumer, Module } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  // this will automatically create the user repository file for us
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // any request that comes in to the application, not just the controllers defined in this module
    // will have the CurrentUserInterceptor applied and the userId will be fetched.
    // this results in some unnecessary requests, but makes development easier
    // would probably be best practice to add the global interceptors to the app.module
    // instead of users.module
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor,
    // },
  ],
})
export class UsersModule {
  // the above CurrentUserInterceptor was commented out because this Middleware example
  // is the correct way to implement checking a user's privledges before hitting a route
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
