import { Injectable, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from 'src/generated/prisma/client';
import { PrismaClient } from '../generated/prisma/client';

import { PrismaNeon } from '@prisma/adapter-neon';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor(){

        const adapter = new PrismaNeon({
            connectionString: process.env.DATABASE_URL
        })

        super({ adapter })
    }

    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }

}
