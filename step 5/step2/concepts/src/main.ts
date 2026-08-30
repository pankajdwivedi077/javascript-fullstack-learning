import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoginInterceptor } from './common/interceptors/login.interceptors';

// entry point of nestjs application

async function bootstrap() {

  const logger = new Logger("Bootstrap")

  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"]
  });

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

  app.useGlobalInterceptors(new LoginInterceptor())

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
