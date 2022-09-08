import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
const cookieSession = require('cookie-session');
const dbConfig = require('../ormconfig.js');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot(dbConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      // validates that any extra properties not part of the dto
      // are stripped away
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  // This configure function will be called automatically whenever
  // our app starts listening for incoming traffic
  configure(consumer: MiddlewareConsumer) {
    // run on every incoming request
    // this is globally scoped Middleware
    consumer
      .apply(
        cookieSession({
          // This random string is being used to encrypt the cookie
          // for dev this is fine
          // this string needs to be an env variable for security or someone could decrypt
          // the cookies
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
