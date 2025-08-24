import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SeederService } from './seeder.service';
import { BcryptService } from 'src/auth/bcrypt.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SeederService, BcryptService],
  exports: [SeederService],
})
export class SeederModule {}
