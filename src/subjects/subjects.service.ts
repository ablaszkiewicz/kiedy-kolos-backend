import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '@App/entities/subject.entity';
import { User } from '@App/entities/user.entity';
import { YearCourse } from '@App/entities/yearCourse.entity';
import { UsersService } from '@App/users/users.service';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SubjectsService {
  constructor(@InjectRepository(Subject) private subjectsRepository: Repository<Subject>) {}

  async findAll(): Promise<Subject[]> {
    return this.subjectsRepository.find();
  }

  async findById(id: number): Promise<Subject | undefined> {
    return this.subjectsRepository.findOne({ where: { id: id } });
  }

  async findByYearCourse(yearCourse: YearCourse): Promise<Subject[]> {
    return this.subjectsRepository.find({ where: { yearCourse: yearCourse } });
  }

  async create(name: string, shortName: string, yearCourse: YearCourse): Promise<Subject> {
    const newSubject = this.subjectsRepository.create({ name, shortName, yearCourse });
    return this.subjectsRepository.save(newSubject);
  }

  async update(id: number, name: string, shortName: string, yearCourse: YearCourse): Promise<Subject> {
    await this.subjectsRepository.update(id, { name: name, shortName: shortName, yearCourse: yearCourse });
    return this.findById(id);
  }

  async remove(id: number): Promise<Subject> {
    const subject = await this.subjectsRepository.findOne({ where: { id: id } });
    this.subjectsRepository.remove(subject);
    return subject;
  }
}
