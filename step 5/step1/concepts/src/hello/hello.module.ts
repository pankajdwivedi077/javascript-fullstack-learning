import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

@Module({
  imports: [], // import other module if needed  
  controllers: [HelloController], // array controller that belongs to this module
  providers: [HelloService], // array service that belongs to this module
  exports: [HelloService] // export service if need in other module
})
export class HelloModule {}
