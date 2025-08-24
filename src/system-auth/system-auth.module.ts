import { Module } from '@nestjs/common';
import { SystemAuthService } from './system-auth.service';
import { SystemAuthController } from './system-auth.controller';

@Module({
  providers: [SystemAuthService],
  controllers: [SystemAuthController]
})
export class SystemAuthModule {}
