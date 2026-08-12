import { Injectable } from '@nestjs/common';

// decorator -> marks this class as a provider. that can be manged by nestjs dependency system
// business logic of application
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello NestJs!';
  }
}
