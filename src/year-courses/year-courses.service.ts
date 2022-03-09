import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@App/entities/user.entity';
import { YearCourse } from '@App/entities/yearCourse.entity';
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
    const yearCourse: YearCourse = await this.yearCourseRepository.findOne({ where: { id: id }, relations: ['admins'] });
    return yearCourse ? yearCourse.admins : [];
  }

  async create(admin: User, name: string, startYear: number): Promise<YearCourse> {
    const newYearCourse = this.yearCourseRepository.create({ admins: [admin], name: name, startYear: startYear });
    return this.yearCourseRepository.save(newYearCourse);
  }

  async update(id: number, name: string, startYear: number): Promise<YearCourse> {
    await this.yearCourseRepository.update(id, { name: name, startYear: startYear });
    return this.findById(id);
  }

  async remove(id: number): Promise<YearCourse> {
    const yearCourse = await this.yearCourseRepository.findOne({ id: id });
    await this.yearCourseRepository.delete(yearCourse);
    return yearCourse;
  }
}
