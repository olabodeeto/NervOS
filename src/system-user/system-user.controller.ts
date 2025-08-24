import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateSystemUserDto } from './dto/user.dto';
import { SystemUserService } from './system-user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('system')
export class SystemUserController {
  constructor(private systemUserService: SystemUserService) {}

  @Post()
  async createUser(@Body() createSystemUserDto: CreateSystemUserDto) {
    return await this.systemUserService.createSystemUser(createSystemUserDto);
  }

  @Post('login')
  async loginUser(@Body() loginObj) {
    return await this.systemUserService.login(loginObj);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async systemProfile(@Req() req: Request) {
    // throw new NotFoundException('User ID is required');
    console.log(req['user']);
    return '';
  }
}
