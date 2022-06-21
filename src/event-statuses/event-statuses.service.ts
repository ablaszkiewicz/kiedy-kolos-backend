import { EventStatus } from '@App/entities/event-status.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';

@Injectable()
export class EventStatusesService {
  constructor(@InjectRepository(EventStatus) private eventStatusesRepository: Repository<EventStatus>) {}

  async update(dto: UpdateEventStatusDto) {
    let status = await this.eventStatusesRepository.findOne({ where: { userId: dto.userId, eventId: dto.eventId } });

    if (!status) {
      status = this.eventStatusesRepository.create(dto);
    }

    status.status = dto.status;

    return this.eventStatusesRepository.save(status);
  }
}
