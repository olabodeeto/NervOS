import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('auth')
export class AuthController {
  constructor(private otpService: OtpService) {}

  @Post('send-otp')
  async sendOtp(@Body() data: { email: string; userType: string }) {
    const { email, userType } = data;
    return await this.otpService.sendOTP(email, userType);
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body() data: { id: string; schoolId: string; otpCode: any },
  ) {
    const { id, schoolId, otpCode } = data;
    return await this.otpService.verifyOTP(id, schoolId, otpCode);
  }
}
