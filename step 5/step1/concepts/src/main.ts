import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// entry point of nestjs application

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // global settings
  // env

  // starts a http server

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
