import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { AuthModule } from '@App/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '@App/entities/subject.entity';
import { YearCoursesModule } from '@App/year-courses/year-courses.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Subject]), YearCoursesModule],
  providers: [SubjectsService],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
