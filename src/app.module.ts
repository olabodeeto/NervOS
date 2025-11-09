import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { AdminModule } from './admin/admin.module';
import { AuditTrailModule } from './audit-trail/audit-trail.module';

import { SystemAuthModule } from './system-auth/system-auth.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { SystemUserModule } from './system-user/system-user.module';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from './utils/utils.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    SystemUserModule,
    PrismaModule,
    AdminModule,
    AuditTrailModule,
    SystemAuthModule,
    AdminAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UtilsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
