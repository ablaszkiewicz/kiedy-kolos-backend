import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Result } from '../entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YearCoursesModule } from '@App/year-courses/year-courses.module';
import { UsersModule } from '@App/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Result]), YearCoursesModule, UsersModule],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [ResultsService],
})
export class ResultsModule {}
