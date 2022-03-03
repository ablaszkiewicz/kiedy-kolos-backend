import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '@App/entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private groupsRepository: Repository<Group>) {}

  async create(name: string, yearCourseId: number): Promise<Group> {
    const group: Group = this.groupsRepository.create({ name: name, yearCourseId: yearCourseId });
    return this.groupsRepository.save(group);
  }

  async getAll(): Promise<Group[]> {
    return this.groupsRepository.find();
  }

  async getAllByYearCourse(yearCourseId: number): Promise<Group[]> {
    return this.groupsRepository.find({ yearCourseId: yearCourseId });
  }

  async getById(id: uuid): Promise<Group> {
    return this.groupsRepository.findOne({ where: { id: id } });
  }

  async update(id: uuid, name: string): Promise<Group> {
    await this.groupsRepository.update(id, { name: name });
    return await this.getById(id);
  }

  async delete(id: uuid): Promise<Group> {
    const group: Group = await this.getById(id);
    await this.groupsRepository.delete(id);
    return group;
  }
}
