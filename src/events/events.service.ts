import { v4 as uuid } from 'uuid';
import { Event } from '@App/entities/event.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { Group } from '@App/entities/group.entity';
import { GroupsService } from '@App/groups/groups.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
    private groupsService: GroupsService
  ) {}

  async getAll(): Promise<Event[]> {
    return this.eventsRepository.find({ relations: ['subject', 'groups'] });
  }

  async getAllByYearCourse(yearCourseId: uuid): Promise<Event[]> {
    return this.eventsRepository.find({ where: { yearCourseId: yearCourseId }, relations: ['subject', 'groups'] });
  }

  async getById(id: uuid): Promise<Event> {
    return this.eventsRepository.findOne({ where: { id: id }, relations: ['groups'] });
  }

  async create(yearCourseId: uuid, dto: CreateEventDTO): Promise<Event> {
    const groups = dto.groups.map((groupId) => ({ ...new Group(), id: groupId }));

    const event: Event = this.eventsRepository.create({
      yearCourseId: yearCourseId,
      date: dto.date,
      subjectId: dto.subjectId,
      groups: groups,
      description: dto.description,
      room: dto.room,
    });
    return this.eventsRepository.save(event);
  }

  async update(id: uuid, dto: UpdateEventDTO): Promise<Event> {
    const groups = await Promise.all(dto.groups.map(async (groupId) => this.groupsService.getById(groupId)));
    const event = await this.getById(id);

    event.groups = groups;
    event.date = dto.date as any;
    event.subjectId = dto.subjectId;
    event.description = dto.description;
    event.room = dto.room;

    return this.eventsRepository.save(event);
  }

  async delete(id: uuid): Promise<Event> {
    const event: Event = await this.getById(id);
    await this.eventsRepository.delete(id);
    return event;
  }
}
