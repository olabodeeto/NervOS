import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UtilsService {
  constructor(private db: PrismaService) {}

  generateSchoolCode = async (): Promise<string> => {
    const maxAttempts = 10;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // 8 digits
      const code = `ACH-${randomNumber}`;
      attempts++;
    }

    throw new BadGatewayException(
      'Failed to generate a unique school code after multiple attempts.',
    );
  };

  generateStaffCode = async (): Promise<string> => {
    const maxAttempts = 10;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // 8 digits
      const code = `STF-${randomNumber}`;
      attempts++;
    }

    throw new BadGatewayException(
      'Failed to generate a unique school code after multiple attempts.',
    );
  };

  generateOTP = async (length = 6) => {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10); // 0-9
    }
    return otp;
  };
}
