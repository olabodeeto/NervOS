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
      const existing = await this.db.school.findUnique({
        where: { schoolCode: code },
      });
      if (!existing) {
        return code; // unique code found
      }
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
      const existing = await this.db.staff.findUnique({
        where: { staffCode: code },
      });
      if (!existing) {
        return code; // unique code found
      }
      attempts++;
    }

    throw new BadGatewayException(
      'Failed to generate a unique school code after multiple attempts.',
    );
  };

  generateStudentCode = async (): Promise<string> => {
    const maxAttempts = 10;
    let attempts = 0;
    while (attempts < maxAttempts) {
      const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // 8 digits
      const code = `SDT-${randomNumber}`;
      const existing = await this.db.school.findUnique({
        where: { schoolCode: code },
      });
      if (!existing) {
        return code; // unique code found
      }
      attempts++;
    }

    throw new BadGatewayException(
      'Failed to generate a unique school code after multiple attempts.',
    );
  };
}
