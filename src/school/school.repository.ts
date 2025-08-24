import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateSchool } from './interfaces/school.interfaces';

@Injectable()
export class SchoolRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prismaService.school.findUnique({
      where: { email },
      include: { role: true },
    });
  }

  async createSchool(data: ICreateSchool) {
    return await this.prismaService.school.create({
      data,
      omit: { password: true, roleId: true },
      include: { role: true },
    });
  }
}
