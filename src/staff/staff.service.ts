import {
  BadGatewayException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BcryptService } from 'src/auth/bcrypt.service';
import { UtilsService } from 'src/utils/utils.service';
import { StaffRepository } from './staff.repository';
import { ICreateStaff } from './staff.nterface';
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

  validate = async (data: { email: string; password: string }) => {
    const staff = await this.repo.findByEmail(data.email);
    if (!staff) throw new UnauthorizedException('Invalid credentials');
    const ismatch = await this.Bcrypt.compare(data.password, staff.password);
    if (!ismatch) throw new UnauthorizedException('Invalid credentials');
    return staff;
  };

  async staffLogin(data: { email: string; password: string }) {
    const staff = await this.validate(data);
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
}
