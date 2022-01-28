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
  ) {
    this.initialize();
  }

  async initialize(): Promise<void> {
    const subject = await this.getSubjectByName('Testowy przedmiot 1');
    if (subject === undefined) {
      const user = await this.usersService.getOneByEmail('test@pg.edu.pl');
      this.createSubject('Testowy przedmiot 1', user);
      //this.createSubject('Testowy przedmiot 2', user);
    } else {
      console.log(subject);
    }
  }

  async getAllSubjects(): Promise<Subject[]> {
    return this.subjectsRepository.find();
  }

  async getSubjectByName(name: string): Promise<Subject | undefined> {
    return this.subjectsRepository.findOne({ where: { name: name } });
  }

  async getSubjectsByOwner(user: User): Promise<Subject[]> {
    return this.subjectsRepository.find({ where: { owner: user } });
  }

  createSubject(name: string, owner: User): Promise<Subject> {
    const newSubject = this.subjectsRepository.create({ name, owner });
    return this.subjectsRepository.save(newSubject);
  }
}
