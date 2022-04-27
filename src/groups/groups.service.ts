import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '@App/entities/group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private groupsRepository: Repository<Group>) {}

  async getAll(): Promise<Group[]> {
    return this.groupsRepository.find();
  }

  async getAllByYearCourse(yearCourseId: uuid): Promise<Group[]> {
    return this.groupsRepository.find({ yearCourseId: yearCourseId });
  }

  async getById(id: uuid): Promise<Group> {
    return this.groupsRepository.findOne({ where: { id: id } });
  }

  async create(yearCourseId: uuid, dto: CreateGroupDto): Promise<Group> {
    const group: Group = this.groupsRepository.create({ name: dto.name, yearCourseId: yearCourseId });
    return this.groupsRepository.save(group);
  }

  async update(id: uuid, dto: UpdateGroupDto): Promise<Group> {
    await this.groupsRepository.update(id, { name: dto.name });
    return this.getById(id);
  }

  async delete(id: uuid): Promise<Group> {
    const group: Group = await this.getById(id);
    await this.groupsRepository.delete(id);
    return group;
  }
}
