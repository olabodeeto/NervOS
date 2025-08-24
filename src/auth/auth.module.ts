import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [BcryptService, JwtStrategy],
  exports: [BcryptService, JwtStrategy], // export so other modules can use it
})
export class AuthModule {}
