import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from 'src/auth/bcrypt.service';

@Injectable()
export class SeederService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
  ) {}

  async seed() {
    const existingUser = await this.prisma.user.findFirst({
      where: { email: 'super@classut.com' },
    });

    if (!existingUser) {
      const hashedPassword = await this.bcryptService.hash('test1234');

      const superRole = await this.prisma.role.upsert({
        where: { name_schoolId: { name: 'superadmin', schoolId: 'classut' } },
        update: {},
        create: {
          name: 'superadmin',
          schoolId: 'classut',
          permissions: JSON.stringify(['Global']),
        },
      });

      await this.prisma.user.create({
        data: {
          name: 'Super Admin',
          email: 'super@classut.com',
          password: hashedPassword,
          roleId: superRole.id,
        },
      });

      console.log('✅ Super Admin user created');
    } else {
      console.log('ℹ️ Super Admin already exists');
    }
  }
}
