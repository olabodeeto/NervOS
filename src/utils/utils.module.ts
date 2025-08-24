import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
