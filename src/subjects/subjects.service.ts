import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '@App/entities/subject.entity';
import { YearCourse } from '@App/entities/yearCourse.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDTO } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(@InjectRepository(Subject) private subjectsRepository: Repository<Subject>) {}

  async findAll(): Promise<Subject[]> {
    return this.subjectsRepository.find();
  }

  async findById(id: uuid): Promise<Subject | undefined> {
    return this.subjectsRepository.findOne({ where: { id: id } });
  }

  async findByYearCourse(yearCourse: YearCourse): Promise<Subject[]> {
    return this.subjectsRepository.find({ where: { yearCourse: yearCourse } });
  }

  async create(yearCourse: YearCourse, dto: CreateSubjectDTO): Promise<Subject> {
    const newSubject = this.subjectsRepository.create({ name: dto.name, shortName: dto.shortName, yearCourse });
    return this.subjectsRepository.save(newSubject);
  }

  async update(id: uuid, dto): Promise<Subject> {
    await this.subjectsRepository.update(id, { name: dto.name, shortName: dto.shortName });
    return this.findById(id);
  }

  async remove(id: uuid): Promise<Subject> {
    const subject = await this.findById(id);
    await this.subjectsRepository.delete(id);
    return subject;
  }
}
