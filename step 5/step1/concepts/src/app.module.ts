import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import * as joi from "joi";
import appConfig from './config/app.config';

// root module -> use all the sub module

@Module({
  imports: [
    ConfigModule.forRoot({ // mnakes configmodule globally available
      isGlobal: true,
      validationSchema: joi.object({
        APP_NAME: joi.string().default("defaultApp"),
      })
      // load: [appConfig],
    })
    ,HelloModule, UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
