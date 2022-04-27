import { v4 as uuid } from 'uuid';
import { Event } from '@App/entities/event.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private eventsRepository: Repository<Event>) {}

  async create(yearCourseId: uuid, date: string, subjectId: uuid): Promise<Event> {
    const event: Event = this.eventsRepository.create({
      yearCourseId: yearCourseId,
      date: date,
      subjectId: subjectId,
    });
    return this.eventsRepository.save(event);
  }

  async getAll(): Promise<Event[]> {
    return this.eventsRepository.find({ relations: ['subject'] });
  }

  async getAllByYearCourse(yearCourseId: uuid): Promise<Event[]> {
    return this.eventsRepository.find({ where: { yearCourseId: yearCourseId }, relations: ['subject'] });
  }

  async getById(id: uuid): Promise<Event> {
    return this.eventsRepository.findOne({ where: { id: id } });
  }

  async update(id: uuid, date: string, subjectId: string): Promise<Event> {
    await this.eventsRepository.update(id, { date, subjectId });
    return this.getById(id);
  }

  async delete(id: uuid): Promise<Event> {
    const event: Event = await this.getById(id);
    await this.eventsRepository.delete(id);
    return event;
  }
}
