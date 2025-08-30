import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { StaffRepository } from './staff.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminMiddleware } from 'src/middleware/admin.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [PrismaModule, AuthModule, UtilsModule],
  providers: [StaffService, StaffRepository],
  controllers: [StaffController],
})
export class StaffModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .exclude(
        { path: '/staff/:id', method: RequestMethod.POST },
        { path: '/staff/:id', method: RequestMethod.GET },
      )
      .forRoutes({ path: '/staff', method: RequestMethod.POST });
  }
}
