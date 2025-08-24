import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateSchoolDto } from './dto/school.dto';
import { SchoolService } from './school.service';

@Controller('school')
export class SchoolController {
  constructor(private scholService: SchoolService) {}

  @Post('create-school')
  @UseGuards(JwtAuthGuard)
  async createSchool(@Body() data: CreateSchoolDto) {
    return await this.scholService.createSchool(data);
  }

  @Post('login')
  async schoolLogin(@Body() data: { email: string; password: string }) {
    return this.scholService.login(data);
  }
}
