import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YearCoursesModule } from './year-courses/year-courses.module';
import { config, e2eConfig } from '../ormconfig';
import { GroupsModule } from './groups/groups.module';
import { EventsModule } from './events/events.module';
import { ResultsModule } from './results/results.module';
import { EventStatusesModule } from './event-statuses/event-statuses.module';

@Module({
  imports: [
    UsersModule,
    SubjectsModule,
    TypeOrmModule.forRoot(process.env.NODE_ENV === 'test' ? e2eConfig : config),
    YearCoursesModule,
    GroupsModule,
    EventsModule,
    ResultsModule,
    EventStatusesModule,
  ],
  controllers: [],
})
export class AppModule {}
