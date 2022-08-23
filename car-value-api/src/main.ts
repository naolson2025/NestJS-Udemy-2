import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
