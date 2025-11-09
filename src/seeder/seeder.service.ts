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
      where: { email: 'super@thenervos.com' },
    });

    if (!existingUser) {
      const hashedPassword = await this.bcryptService.hash('test1234');

      const superRole = await this.prisma.role.upsert({
        where: { name_tenantId: { name: 'superadmin', tenantId: 'nervos' } },
        update: {},
        create: {
          name: 'superadmin',
          tenantId: 'nervos',
          permissions: JSON.stringify(['Global']),
        },
      });

      await this.prisma.user.upsert({
        where: { email: 'super@thenervos.com' },
        update: {}, // leave empty or add fields to update if already exists
        create: {
          email: 'super@thenervos.com',
          name: 'Admin',
          password: hashedPassword,
          roleId: superRole.id,
        },
      });

      await this.prisma.role.upsert({
        where: { name_tenantId: { name: 'admin', tenantId: 'nervos' } },
        update: { permissions: JSON.stringify({ ...AllPermissions }) },
        create: {
          name: 'admin',
          tenantId: 'nervos',
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
