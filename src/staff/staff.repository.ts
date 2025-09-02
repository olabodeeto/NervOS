import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateStaff } from './staff.nterface';

@Injectable()
export class StaffRepository {
  constructor(private readonly database: PrismaService) {}

  async createAccount(data: ICreateStaff) {
    return this.database.staff.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        photo: data.photo,
        documents: data.documents,
        staffType: data.staffType,
        staffCode: data.staffCode,
        address: data.address,
        schoolId: data.schoolId,
        isAcademic: data.staffType === 'ACADEMIC' ? true : false,
        roleId: data.roleId,
      },
    });
  }
  async findByEmail(email: string) {
    return this.database.staff.findFirst({
      where: { email },
      include: { role: true },
    });
  }

  async findByID(id: string) {
    return this.database.staff.findFirst({
      where: { id },
      omit: { password: true },
      include: { role: true },
    });
  }

  async getStaffRole() {
    return await this.database.role.findFirst({ where: { name: 'staff' } });
  }

  async updateAccount() {}
  async deactivateAccount() {}
}
