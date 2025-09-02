import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BcryptService } from 'src/auth/bcrypt.service';
import { UtilsService } from 'src/utils/utils.service';
import { StaffRepository } from './staff.repository';
import { ICreateStaff, IUpdateStaff } from './staff.nterface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class StaffService {
  constructor(
    private Bcrypt: BcryptService,
    private utils: UtilsService,
    private repo: StaffRepository,
    private readonly jwtService: JwtService,
  ) {}

  //create staff
  async createStaff(data: any, schoolId: string) {
    const hash = await this.Bcrypt.hash(data.password);
    const staffRole = await this.repo.getStaffRole();
    if (!staffRole) throw new BadRequestException('Staff role not found');
    const payload: ICreateStaff = {
      ...data,
      roleId: staffRole.id,
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

  validate = async (data: { email: string; password: string }) => {
    const staff = await this.repo.findByEmail(data.email);
    if (!staff) throw new UnauthorizedException('Invalid credentials');
    const ismatch = await this.Bcrypt.compare(data.password, staff.password);
    if (!ismatch) throw new UnauthorizedException('Invalid credentials');
    return staff;
  };

  // Staff login
  async staffLogin(data: { email: string; password: string }) {
    const staff = await this.validate(data);
    console.log('staff', staff);
    const { password, ...rest } = staff;
    const payload = {
      sub: staff.id,
      roleId: staff.roleId,
      name: staff.firstName + '' + staff.lastName,
      email: staff.email,
      role: staff.role,
      userType: staff.userType,
      schoolId: staff.schoolId,
    };

    const accessToken = this.jwtService.sign(payload);
    return { ...rest, access_token: accessToken };
  }

  // Get staff by id
  async getStaff(id: string) {
    const staff = await this.repo.findByID(id);
    if (!staff) throw new BadRequestException('Staff not found!');
    return { ...staff };
  }

  //update staff
  async update(id: string, data: IUpdateStaff) {
    const staff = await this.repo.findByID(id);
    if (!staff) throw new BadRequestException('Staff not found!');
    const updated = await this.repo.updateAccount(id, data);
    if (!updated) throw new BadRequestException('Oops!, action failed!');
    return { ...updated };
  }
}
