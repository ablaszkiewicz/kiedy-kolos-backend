import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YearCourse } from 'src/entities/yearCourse.entity';
import { UsersModule } from 'src/users/users.module';
import { YearCoursesController } from './year-courses.controller';
import { YearCoursesService } from './year-courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([YearCourse]), UsersModule],
  controllers: [YearCoursesController],
  providers: [YearCoursesService],
})
export class YearCoursesModule {}
