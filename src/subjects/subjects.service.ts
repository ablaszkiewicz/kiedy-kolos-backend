import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/entities/subject.entity';
import { User } from 'src/entities/user.entity';
import { YearCourse } from 'src/entities/yearCourse.entity';
import { UsersService } from 'src/users/users.service';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SubjectsService {
  constructor(@InjectRepository(Subject) private subjectsRepository: Repository<Subject>) {}

  async getAll(): Promise<Subject[]> {
    return this.subjectsRepository.find();
  }

  async getSubjectById(id: number): Promise<Subject | undefined> {
    return this.subjectsRepository.findOne({ where: { id: id } });
  }

  async getSubjectByName(name: string): Promise<Subject | undefined> {
    return this.subjectsRepository.findOne({ where: { name: name } });
  }

  async getByYearCourse(yearCourse: YearCourse): Promise<Subject[]> {
    return this.subjectsRepository.find({ where: { yearCourse: yearCourse } });
  }

  async create(name: string, shortName: string, yearCourse: YearCourse): Promise<Subject> {
    const newSubject = this.subjectsRepository.create({ name, shortName, yearCourse });
    return this.subjectsRepository.save(newSubject);
  }

  async update(id: number, name: string, shortName: string, yearCourse: YearCourse): Promise<Subject> {
    await this.subjectsRepository.update(id, { name: name, shortName: shortName, yearCourse: yearCourse });
    return this.getSubjectById(id);
  }

  async delete(id: number): Promise<Subject> {
    const subject = await this.subjectsRepository.findOne({ where: { id: id } });
    this.subjectsRepository.remove(subject);
    return subject;
  }

  async isOwner(userId: number, subjectId: number): Promise<boolean> {
    const subject = await this.subjectsRepository.findOne({ where: { id: subjectId, owner: userId } });
    if (subject === undefined) {
      return false;
    }
    return true;
  }
}
