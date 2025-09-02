import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OtpService {
  constructor(
    private readonly database: PrismaService,
    private repo: AuthRepository,
    private util: UtilsService,
    private readonly jwtService: JwtService,
  ) {}
  async sendOTP(email: string, userType: string) {
    const otpcode = await this.util.generateOTP();
    const user = await this.repo.findByEmail(email, userType);
    if (!user) throw new BadRequestException('User not found');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    const newCode = await this.database.otp.create({
      data: {
        userId: user.id,
        userType: user.userType,
        code: otpcode,
        school: {
          connect: {
            id: userType === 'SCHOOL' ? user.id : user.school.id,
          },
        },
        expiresAt,
      },
    });
    console.log('otp==>', otpcode);

    //user mailer service here
    if (newCode) return { id: newCode.userId, schoolId: newCode.schoolId };
  }
  async verifyOTP(id: string, schoolId: string, otpCode: any) {
    const isMatch = await this.repo.findOTP(otpCode, id, schoolId);
    if (!isMatch) throw new BadRequestException('Invalid OTP code');
    await this.repo.deleteOTP(otpCode, id, schoolId);
    const resetToken = this.jwtService.sign(
      { userId: id, schoolId, purpose: 'password_reset' },
      { expiresIn: '5m' },
    );
    return { message: 'Otp verified!', token: resetToken };
  }
}
