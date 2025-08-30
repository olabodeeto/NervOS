import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SchoolRepository } from './school.repository';
import { BcryptService } from 'src/auth/bcrypt.service';
import { RoleService } from 'src/role/role.service';
import { UtilsService } from 'src/utils/utils.service';
import { CreateSchoolDto } from './dto/school.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AnnoucementPerm,
  FileStoragePerm,
  GuardianPerm,
  InventoryPerm,
  MessagePerm,
  SchoolClassPerm,
  StaffPerm,
  StudentPerm,
  TeacherPerm,
} from 'src/utils/permissions.utils';

@Injectable()
export class SchoolService {
  constructor(
    private repo: SchoolRepository,
    private bcryptService: BcryptService,
    private roleService: RoleService,
    private utils: UtilsService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async createSchool(data: CreateSchoolDto) {
    const findSchool = await this.repo.findByEmail(data.email);
    const findRole = await this.roleService.findRoleWithName('admin');
    const schoolCode = await this.utils.generateSchoolCode();
    if (findSchool) throw new BadRequestException('Credentials taken');
    if (!findRole) throw new BadRequestException('Something went wrong');
    if (!schoolCode) throw new BadRequestException('Something went wrong');
    const hashPwd = await this.bcryptService.hash(data.password);
    data.password = hashPwd;
    const { password, name, email, address, logo } = data;
    const payload = {
      roleId: findRole.id,
      name,
      email,
      password,
      address,
      logo,
      schoolCode,
    };

    const newSchool = await this.repo.createSchool(payload);
    if (!newSchool)
      throw new BadRequestException("Couldn't create school account");
    const subscription = await this.repo.findSubscription('Freemium');
    if (!subscription) {
      throw new Error('Freemium subscription plan not found');
    }

    await this.prismaService.role.upsert({
      where: { name_schoolId: { name: 'staff', schoolId: newSchool.id } },
      update: {},
      create: {
        name: 'staff',
        schoolId: newSchool.id,
        permissions: JSON.stringify([
          ...StaffPerm,
          ...TeacherPerm,
          ...StudentPerm,
          ...GuardianPerm,
          ...SchoolClassPerm,
          ...FileStoragePerm,
          ...InventoryPerm,
          ...AnnoucementPerm,
          ...MessagePerm,
          'STAFF',
        ]),
      },
    });

    await this.prismaService.role.upsert({
      where: { name_schoolId: { name: 'teacher', schoolId: newSchool.id } },
      update: {},
      create: {
        name: 'teacher',
        schoolId: newSchool.id,
        permissions: JSON.stringify([
          ...StaffPerm,
          ...TeacherPerm,
          ...StudentPerm,
          ...GuardianPerm,
          ...SchoolClassPerm,
          ...FileStoragePerm,
          ...InventoryPerm,
          ...AnnoucementPerm,
          ...MessagePerm,
          'TEACHER',
        ]),
      },
    });
    //create subscription for school
    await this.repo.createSchoolSubs(
      newSchool.id,
      subscription.id,
      subscription.duration,
    );

    return { ...newSchool };
  }

  validate = async (data: { email: string; password: string }) => {
    const school = await this.repo.findByEmail(data.email);
    if (!school) throw new UnauthorizedException('Invalid credentials');
    const ismatch = await this.bcryptService.compare(
      data.password,
      school.password,
    );
    if (school.role.name != 'admin')
      throw new ForbiddenException('You are not allwowed on this resource');
    if (!ismatch) throw new UnauthorizedException('Invalid credentials');
    return school;
  };

  login = async (data: { email: string; password: string }) => {
    const user = await this.validate(data);
    // const { password, ...rest } = user;
    const { password, ...rest } = user;
    // console.log(password + 'kdkdkdd');

    const payload = {
      sub: user.id,
      roleId: user.role.id,
      name: user.name,
      email: user.email,
      role: user.role,
      userType: user.userType,
      schoolId: user.id,
    };
    const accessToken = this.jwtService.sign(payload);
    return { ...rest, access_token: accessToken };
  };
}
