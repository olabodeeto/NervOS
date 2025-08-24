import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findRoleWithName(roleName: string) {
    const role = await this.prisma.role.findFirst({
      where: { name: roleName },
    });
    return role;
  }
}
