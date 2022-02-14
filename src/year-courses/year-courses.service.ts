import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { YearCourse } from 'src/entities/yearCourse.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class YearCoursesService {
  constructor(@InjectRepository(YearCourse) private yearCourseRepository: Repository<YearCourse>) {}

  async findAll(): Promise<YearCourse[]> {
    return this.yearCourseRepository.find();
  }

  async findByAdmin(user: User): Promise<YearCourse[]> {
    const query: SelectQueryBuilder<YearCourse> = this.yearCourseRepository.createQueryBuilder('y');
    query.innerJoinAndSelect('y.admins', 'adminAlias');
    query.where('adminAlias.id = :user', { user: user.id });
    return query.getMany();
  }

  async findById(id: number): Promise<YearCourse> {
    return this.yearCourseRepository.findOne({ where: { id: id } });
  }

  async findAdminsById(id: number): Promise<User[]> {
    return (await this.yearCourseRepository.findOne({ where: { id: id }, relations: ['admins'] })).admins;
  }

  async create(admin: User, name: string): Promise<YearCourse> {
    const newYearCourse = this.yearCourseRepository.create({ admins: [admin], name: name });
    return this.yearCourseRepository.save(newYearCourse);
  }

  async remove(id: number): Promise<YearCourse> {
    const yearCourse = await this.yearCourseRepository.findOne({ id: id });
    this.yearCourseRepository.remove(yearCourse);
    return yearCourse;
  }
}
