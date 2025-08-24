import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateSystermUser } from './interfaces/system-user.interfaces';

@Injectable()
export class SystemUserRepository {
  constructor(private prismaService: PrismaService) {}

  create = async (data: ICreateSystermUser) => {
    return this.prismaService.user.create({
      data,
      include: { role: true },
      omit: { password: true, roleId: true },
    });
  };

  findByEmail = async (email: string) => {
    return this.prismaService.user.findUnique({
      where: { email },
      include: { role: true },
      omit: { roleId: true },
    });
  };
}
