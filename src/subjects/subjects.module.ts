import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/entities/subject.entity';
import { YearCoursesModule } from 'src/year-courses/year-courses.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Subject]), YearCoursesModule],
  providers: [SubjectsService],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
