import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// entry point of nestjs application

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // global settings
  // env

  // validating incoming request bodies automatically
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // strips properties that don't have decorator
  //     forbidNonWhitelisted: true,
  //     transform: true, // automatically transfor payloads to be objects typed according to their dto class
  //     disableErrorMessages: false
  //   })
  // )

  // starts a http server

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
