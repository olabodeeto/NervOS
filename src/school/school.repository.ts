import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateSchool } from './interfaces/school.interfaces';

@Injectable()
export class SchoolRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prismaService.school.findUnique({
      where: { email },
      include: {
        role: true,
        SchoolSubscription: { select: { subscription: true } },
      },
    });
  }

  async createSchool(data: ICreateSchool) {
    return await this.prismaService.school.create({
      data,
      omit: { password: true, roleId: true },
      include: { role: true },
    });
  }

  async findSubscription(plan: string) {
    return await this.prismaService.subscription.findFirst({
      where: { name: plan },
    });
  }

  async createSchoolSubs(
    schoolId: string,
    subscriptionId: string,
    duration: number,
  ) {
    return this.prismaService.schoolSubscription.create({
      data: {
        schoolId,
        subscriptionId,
        startDate: new Date(),
        endDate: new Date(
          new Date().setMonth(new Date().getMonth() + duration),
        ),
      },
    });
  }

  // async createSchoolSubscription(data: any) {
  //   return await this.prismaService.schoolSubscription.create({
  //     data: { ...data },
  //   });
  // }
}
