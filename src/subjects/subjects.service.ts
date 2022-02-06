import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/entities/subject.entity';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject) private subjectsRepository: Repository<Subject>,
    private usersService: UsersService
  ) {}

  async getAllSubjects(): Promise<Subject[]> {
    return this.subjectsRepository.find();
  }

  async getSubjectById(id: number): Promise<Subject | undefined> {
    return this.subjectsRepository.findOne({ where: { id: id } });
  }

  async getSubjectByName(name: string): Promise<Subject | undefined> {
    return this.subjectsRepository.findOne({ where: { name: name } });
  }

  async getSubjectByIdAndOwner(id: number, user: User): Promise<Subject> {
    return this.subjectsRepository.findOne({ where: { id: id, owner: user } });
  }

  async getSubjectsByOwner(user: User): Promise<Subject[]> {
    return this.subjectsRepository.find({ where: { owner: user } });
  }

  async createSubject(name: string, shortName: string, owner: User): Promise<Subject> {
    const newSubject = this.subjectsRepository.create({ name, shortName, owner });
    return this.subjectsRepository.save(newSubject);
  }

  async deleteSubject(id: number) {
    const subject = await this.getSubjectById(id);
    this.subjectsRepository.remove(subject);
    return subject;
  }
}
