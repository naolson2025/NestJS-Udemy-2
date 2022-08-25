import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// cookie session has not been updated to import with NestJS so need to require() instead
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      // This random string is being used to encrypt the cookie
      // for dev this is fine
      keys: ['alkibel'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      // validates that any extra properties not part of the dto
      // are stripped away
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
