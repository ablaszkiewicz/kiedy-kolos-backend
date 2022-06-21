import { Module } from '@nestjs/common';
import { EventStatusesService } from './event-statuses.service';
import { EventStatusesController } from './event-statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventStatus } from '@App/entities/event-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventStatus])],
  controllers: [EventStatusesController],
  providers: [EventStatusesService],
})
export class EventStatusesModule {}
