import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }
  async onModuleInit() {
    await this.$connect();
    console.log('connected to db');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Optional: soft delete middleware, logging, etc.
}
