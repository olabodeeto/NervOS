import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    this.$connect()
      .then(() => {
        console.log('db connected');
      })
      .catch((err) => {
        console.log('error connecting to db', err);
      });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Optional: soft delete middleware, logging, etc.
}
