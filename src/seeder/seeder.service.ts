import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from 'src/auth/bcrypt.service';
import { AllPermissions } from 'src/utils/permissions.utils';

@Injectable()
export class SeederService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
  ) {}

  async seed() {
    const plans = [
      { name: 'Freemium', duration: 1, price: 0 },
      { name: 'Basic', duration: 6, price: 99.99 },
      { name: 'Premium', duration: 12, price: 199.99 },
    ];
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

      await this.prisma.role.upsert({
        where: { name_schoolId: { name: 'admin', schoolId: 'classut' } },
        update: { permissions: JSON.stringify({ ...AllPermissions }) },
        create: {
          name: 'admin',
          schoolId: 'classut',
          permissions: JSON.stringify({ ...AllPermissions }),
        },
      });

      for (const plan of plans) {
        await this.prisma.subscription.upsert({
          where: { name: plan.name },
          update: { price: plan.price, duration: plan.duration },
          create: {
            name: plan.name,
            duration: plan.duration,
            price: plan.price,
            status: true,
          },
        });
      }

      console.log('✅ Subscription plans with prices seeded successfully');
    } else {
      console.log('ℹ️ Super Admin already exists');
    }
  }
}
