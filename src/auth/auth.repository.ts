import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private Database: PrismaService) {}

  async findByEmail(email: string, userType: string) {}

  async findOTP(code: any, userId: string, schoolId: string) {}

  async deleteOTP(code: any, userId: string, schoolId: string) {}
}
