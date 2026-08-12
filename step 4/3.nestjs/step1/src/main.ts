import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// main entry point of application

async function bootstrap() {
  // create a nestjs application instance
  const app = await NestFactory.create(AppModule);

  // start the application and listen to this port
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
