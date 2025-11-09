import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SystemUserService } from './system-user.service';
import { SystemUserController } from './system-user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SystemUserRepository } from './system-user.repository';
import { JwtModule } from '@nestjs/jwt';
import { SuperAdminMiddleware } from 'src/middleware/superadmin.middleware';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  providers: [SystemUserService, SystemUserRepository],
  controllers: [SystemUserController],
})
export class SystemUserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SuperAdminMiddleware).forRoutes(
      { path: 'system/me', method: RequestMethod.GET },
      // { path: 'system/forgotpassword', method: RequestMethod.GET },
    );
  }
}
