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
    return this.yearCourseRepository.find({ relations: ['admins'] });
  }

  async findByAdmin(user: User): Promise<YearCourse[]> {
    const query: SelectQueryBuilder<YearCourse> = this.yearCourseRepository.createQueryBuilder('y');
    query.innerJoinAndSelect('y.admins', 'adminAlias');
    query.where('adminAlias.id = :user', { user: user.id });
    return query.getMany();
  }

  async findById(id: uuid): Promise<YearCourse> {
    return this.yearCourseRepository.findOne({ where: { id: id }, relations: ['admins'] });
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
    const yearCourse = await this.findById(id);
    const yearCourseToDelete = await this.yearCourseRepository.findOne({ id: id });
    await this.yearCourseRepository.delete(yearCourseToDelete);
    return yearCourse;
  }

  async addAdmin(id: uuid, admin: User): Promise<YearCourse> {
    const yearCourse = await this.findById(id);
    yearCourse.admins.push(admin);
    return this.yearCourseRepository.save(yearCourse);
  }

  async removeAdmin(id: uuid, admin: User): Promise<YearCourse> {
    const yearCourse = await this.findById(id);
    yearCourse.admins = yearCourse.admins.filter((user) => user.id !== admin.id);
    return this.yearCourseRepository.save(yearCourse);
  }
}
