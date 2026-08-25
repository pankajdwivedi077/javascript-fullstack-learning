import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import * as joi from "joi";
import appConfig from './config/app.config';
import { TypeOrmModule } from "@nestjs/typeorm"
import { Post } from './post/entities/post.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';

// root module -> use all the sub module

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "step3nestjs",
      entities: [Post, User],
      synchronize: true // only in developement
    }),  
    PostModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
