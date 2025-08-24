import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolRepository } from './school.repository';
import { UtilsModule } from 'src/utils/utils.module';
import { RoleModule } from 'src/role/role.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SuperAdminMiddleware } from 'src/middleware/superadmin.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UtilsModule,
    RoleModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  providers: [SchoolService, SchoolRepository],
  controllers: [SchoolController],
})
export class SchoolModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SuperAdminMiddleware)
      .exclude(
        { path: '/school/login', method: RequestMethod.POST }, // 👈 excluded
      )
      .forRoutes({ path: '/school/create-school', method: RequestMethod.POST });
  }
}
