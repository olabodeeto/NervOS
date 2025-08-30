import { BadGatewayException, Injectable } from '@nestjs/common';
import { BcryptService } from 'src/auth/bcrypt.service';
import { UtilsService } from 'src/utils/utils.service';
import { StaffRepository } from './staff.repository';
import { ICreateStaff } from './staff.nterface';

@Injectable()
export class StaffService {
  constructor(
    private Bcrypt: BcryptService,
    private utils: UtilsService,
    private repo: StaffRepository,
  ) {}

  //create staff
  async createStaff(data: any, schoolId: string) {
    const hash = await this.Bcrypt.hash(data.password);
    const payload: ICreateStaff = {
      ...data,
      password: hash,
      documents: JSON.stringify(data.documents),
      staffCode: await this.utils.generateStaffCode(),
      schoolId,
    };

    const checkStaff = await this.repo.findByEmail(payload.email);
    if (checkStaff) throw new BadGatewayException('Staff already exist');
    const staff = await this.repo.createAccount(payload);
    const { password, ...rest } = staff;
    return { ...rest };
  }
}
