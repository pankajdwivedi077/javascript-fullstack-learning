import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// make the module as globally scoped
@Global()
@Module({

  providers: [PrismaService],

  // making sure that this PrismaService is available to other module that will import PrismaModule
  exports: [PrismaService]
})
export class PrismaModule {}
