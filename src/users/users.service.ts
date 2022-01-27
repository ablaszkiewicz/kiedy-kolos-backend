import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { auth, driver, Session, session as neo4jsession } from 'neo4j-driver';
import { toString } from 'neo4j-driver-core';
import { session } from 'passport';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    this.initialize();
  }

  async initialize(): Promise<void> {
    const user = await this.getOneByEmail('test@pg.edu.pl');
    if (user === undefined) {
      this.createUser('test@pg.edu.pl', '123');
    }
  }

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  async getOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  createUser(email: string, password: string): Promise<User> {
    const newUser = this.usersRepository.create({ email, password });
    return this.usersRepository.save(newUser);
  }
}
