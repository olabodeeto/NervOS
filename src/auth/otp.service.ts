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
  }
  async verifyOTP(id: string, schoolId: string, otpCode: any) {}
}
