import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/entities/subject.entity';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SubjectsService {
  constructor(@InjectRepository(Subject) private subjectsRepository: Repository<Subject>) {}

  async getAllSubjects(): Promise<Subject[]> {
    return this.subjectsRepository.find();
  }

  async getSubjectById(id: number): Promise<Subject | undefined> {
    return this.subjectsRepository.findOne({ where: { id: id } });
  }

  async getSubjectByName(name: string): Promise<Subject | undefined> {
    return this.subjectsRepository.findOne({ where: { name: name } });
  }

  async getSubjectsByOwner(user: User): Promise<Subject[]> {
    return this.subjectsRepository.find({ where: { owner: user } });
  }

  async createSubject(name: string, shortName: string, owner: User): Promise<Subject> {
    const newSubject = this.subjectsRepository.create({ name, shortName, owner });
    return this.subjectsRepository.save(newSubject);
  }

  async updateSubject(id: number, name: string, shortName: string): Promise<Subject> {
    await this.subjectsRepository.update(id, { name: name, shortName: shortName });
    return this.getSubjectById(id);
  }

  async deleteSubject(id: number) {
    const subject = await this.subjectsRepository.findOne({ where: { id: id } });
    this.subjectsRepository.remove(subject);
    return subject;
  }

  async isOwner(userId: number, subjectId: number) {
    const subject = await this.subjectsRepository.findOne({ where: { id: subjectId, owner: userId } });
    if (subject === undefined) {
      return false;
    }
    return true;
  }
}
