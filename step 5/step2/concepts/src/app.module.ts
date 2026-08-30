import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { Throttle, ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { FileUploadModule } from './file-upload/file-upload.module';
import { File } from './file-upload/entities/file.entity';
import { EventsModule } from './events/events.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

// root module -> use all the sub module

@Module({
  imports: [
     CacheModule.register({
      isGlobal: true,
      ttl: 30000,
      max: 100
     })
    ,ThrottlerModule.forRoot({
      throttlers:[
        {
          ttl: 60000,
          limit: 5
        }
      ]
     })
    ,TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "step3nestjs",
      entities: [Post, User, File],
      synchronize: true // only in developement
    }),  
    PostModule, AuthModule, ConfigModule.forRoot({
      isGlobal: true
    }), FileUploadModule, EventsModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}
