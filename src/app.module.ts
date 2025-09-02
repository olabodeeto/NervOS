import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SchoolModule } from './school/school.module';
import { AdminModule } from './admin/admin.module';
import { StaffModule } from './staff/staff.module';
import { StudentsModule } from './students/students.module';
import { TeacherModule } from './teacher/teacher.module';
import { KlassModule } from './klass/klass.module';
import { SettingsModule } from './settings/settings.module';
import { AuditTrailModule } from './audit-trail/audit-trail.module';
import { RoleModule } from './role/role.module';
import { SubjectModule } from './subject/subject.module';
import { ParentModule } from './parent/parent.module';
import { NotificationModule } from './notification/notification.module';
import { InvoiceModule } from './invoice/invoice.module';
import { FinanceModule } from './finance/finance.module';
import { ElibraryModule } from './elibrary/elibrary.module';
import { LmsModule } from './lms/lms.module';
import { InventoryModule } from './inventory/inventory.module';
import { SchooleventModule } from './schoolevent/schoolevent.module';
import { SystemAuthModule } from './system-auth/system-auth.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { SystemUserModule } from './system-user/system-user.module';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from './utils/utils.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    SystemUserModule,
    PrismaModule,
    SchoolModule,
    AdminModule,
    StaffModule,
    StudentsModule,
    TeacherModule,
    KlassModule,
    SettingsModule,
    AuditTrailModule,
    RoleModule,
    SubjectModule,
    ParentModule,
    NotificationModule,
    InvoiceModule,
    FinanceModule,
    ElibraryModule,
    LmsModule,
    InventoryModule,
    SchooleventModule,
    SystemAuthModule,
    AdminAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UtilsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
