import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateStaffDto } from './dto/school.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSchool(@Body() data: CreateStaffDto, @Request() req) {
    return await this.staffService.createStaff(data, req.user.schoolId);
  }

  @Post('login')
  async loginStaff(@Body() data: any) {
    return this.staffService.staffLogin(data);
  }
}
