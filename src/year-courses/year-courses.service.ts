import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@App/entities/user.entity';
import { YearCourse } from '@App/entities/yearCourse.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateYearCourseDTO } from './dto/create-year-course.dto';
import { UpdateYearCourseDTO } from './dto/update-year-course.dto';

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

  async findById(id: uuid): Promise<YearCourse> {
    return this.yearCourseRepository.findOne({ where: { id: id } });
  }

  async findAdminsById(id: uuid): Promise<User[]> {
    const yearCourse: YearCourse = await this.yearCourseRepository.findOne({
      where: { id: id },
      relations: ['admins'],
    });
    return yearCourse ? yearCourse.admins : [];
  }

  async create(admin: User, dto: CreateYearCourseDTO): Promise<YearCourse> {
    const newYearCourse = this.yearCourseRepository.create({
      admins: [admin],
      name: dto.name,
      startYear: dto.startYear,
    });
    return this.yearCourseRepository.save(newYearCourse);
  }

  async update(id: uuid, dto: UpdateYearCourseDTO): Promise<YearCourse> {
    await this.yearCourseRepository.update(id, { name: dto.name, startYear: dto.startYear });
    return this.findById(id);
  }

  async remove(id: uuid): Promise<YearCourse> {
    const yearCourse = await this.yearCourseRepository.findOne({ id: id });
    await this.yearCourseRepository.delete(yearCourse);
    return yearCourse;
  }
}
