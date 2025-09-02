import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private Database: PrismaService) {}

  async findByEmail(email: string, userType: string) {
    if (userType === 'SCHOOL') {
      const data = await this.Database.school.findFirst({ where: { email } });
      if (!data) throw new BadRequestException('User not found');
      return { ...data, school: { ...data } };
    }
    if (userType === 'STAFF') {
      return this.Database.staff.findFirst({
        where: { email },
        include: { school: true },
      });
    } else if (userType === 'PARENT') {
      return this.Database.portalUser.findFirst({
        where: { email, userType: 'PARENT' },
        include: { school: true },
      });
    } else if (userType === 'STUDENT') {
      return this.Database.portalUser.findFirst({
        where: { email, userType: 'STUDENT' },
        include: { school: true },
      });
    }
  }

  async findOTP(code: any, userId: string, schoolId: string) {
    return this.Database.otp.findFirst({
      where: {
        code,
        userId,
        schoolId,
      },
    });
  }

  async deleteOTP(code: any, userId: string, schoolId: string) {
    return this.Database.otp.deleteMany({
      where: {
        userId: userId,
      },
    });
  }
}
