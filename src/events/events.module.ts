import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { YearCourse } from '@App/entities/yearCourse.entity';
import { UsersModule } from '@App/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '@App/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), UsersModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
