import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateSystemUserDto } from './dto/user.dto';
import { BcryptService } from 'src/auth/bcrypt.service';
import { SystemUserRepository } from './system-user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SystemUserService {
  constructor(
    private bcryptService: BcryptService,
    private repo: SystemUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  createSystemUser = async (data: CreateSystemUserDto) => {};

  validate = async (data: { email: string; password: string }) => {
    const user = await this.repo.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ismatch = await this.bcryptService.compare(
      data.password,
      user.password,
    );
    if (user.role.name !== 'superadmin')
      throw new ForbiddenException('You are not allwowed on this resource');
    if (!ismatch) throw new UnauthorizedException('Invalid credentials');
    return user;
  };

  login = async (data: { email: string; password: string }) => {
    const user = await this.validate(data);
    const { password, ...rest } = user;
    const payload = {
      sub: user.id,
      roleId: user.role.id,
      name: user.name,
      email: user.email,
      role: user.role,
      schoolId: 'classut',
    };
    const accessToken = this.jwtService.sign(payload);
    return { ...rest, access_token: accessToken };
  };
}
