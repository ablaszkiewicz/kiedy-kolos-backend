import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { AuthModule } from '@App/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YearCoursesModule } from '@App/year-courses/year-courses.module';
import { Group } from '@App/entities/group.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Group]), YearCoursesModule],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
