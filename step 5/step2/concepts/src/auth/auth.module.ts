import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStragy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/role.guard';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    // passport module
    PassportModule,

    //configure jwt
    JwtModule.register({}),
    EventsModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStragy, RolesGuard],
  exports: [AuthService, RolesGuard]
})
export class AuthModule {}
