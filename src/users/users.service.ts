import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@App/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    this.initialize();
  }

  async initialize(): Promise<void> {
    const user = await this.getOneByEmail('test@pg.edu.pl');
    if (user === undefined) {
      this.createUser({ email: 'test@pg.edu.pl', password: '123' });
    }
  }

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getMyDetails(userId: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: userId },
      relations: ['yearCoursesAdminOf', 'yearCoursesUserOf'],
    });
  }

  async getOneById(id: uuid): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  async getOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async createUser(dto: CreateUserDTO): Promise<User> {
    const newUser = this.usersRepository.create({ email: dto.email, password: dto.password });
    return this.usersRepository.save(newUser);
  }
}
