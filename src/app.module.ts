import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YearCoursesModule } from './year-courses/year-courses.module';
import config from '../ormconfig';

@Module({
  imports: [UsersModule, SubjectsModule, TypeOrmModule.forRoot(config), YearCoursesModule],
  controllers: [],
})
export class AppModule {}
