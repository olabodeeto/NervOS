import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { OtpService } from './otp.service';
import { AuthRepository } from './auth.repository';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    UtilsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  providers: [BcryptService, JwtStrategy, OtpService, AuthRepository],
  exports: [BcryptService, JwtStrategy],
  controllers: [AuthController], // export so other modules can use it
})
export class AuthModule {}
