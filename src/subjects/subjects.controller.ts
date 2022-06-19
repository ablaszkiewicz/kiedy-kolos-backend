import { Controller, Get, UseGuards, Body, Post, Param, Delete, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@App/auth/guards/jwt-auth.guard';
import { Subject } from '@App/entities/subject.entity';
import { YearCoursesService } from '@App/year-courses/year-courses.service';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { UpdateSubjectDTO } from './dto/update-subject.dto';
import { YearCourseAdminSubjectGuard } from './guards/year-course-admin-subject.guard';
import { SubjectsService } from './subjects.service';
import { YearCourseParams } from './params/YearCourseParams';
import { YearCourse } from '../entities/yearCourse.entity';
import { YearCourseWithSubjectParams } from './params/YearCourseWithSubjectParams';
import { YearCourseAdminParamsGuard } from '@App/guards/year-course-admin-params-guard';

@ApiBearerAuth()
@ApiTags('subjects')
@Controller()
export class SubjectsController {
  constructor(private subjectsService: SubjectsService, private yearCourseService: YearCoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('subjects')
  async findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @Get('yearCourses/:yearCourseId/subjects')
  async findByYearCourse(@Param() params: YearCourseParams): Promise<Subject[]> {
    const yearCourse: YearCourse = await this.yearCourseService.findById(params.yearCourseId);

    return this.subjectsService.findByYearCourse(yearCourse);
  }

  @UseGuards(JwtAuthGuard, YearCourseAdminParamsGuard)
  @Post('yearCourses/:yearCourseId/subjects')
  async create(@Param() params: YearCourseParams, @Body() dto: CreateSubjectDTO): Promise<Subject> {
    const yearCourse: YearCourse = await this.yearCourseService.findById(params.yearCourseId);

    return this.subjectsService.create(yearCourse, dto);
  }

  @UseGuards(JwtAuthGuard, YearCourseAdminParamsGuard)
  @Put('yearCourses/:yearCourseId/subjects/:subjectId')
  async update(@Param() params: YearCourseWithSubjectParams, @Body() dto: UpdateSubjectDTO): Promise<Subject> {
    return this.subjectsService.update(params.subjectId, dto);
  }

  @UseGuards(JwtAuthGuard, YearCourseAdminParamsGuard)
  @Delete('yearCourses/:yearCourseId/subjects/:subjectId')
  async remove(@Param() params: YearCourseWithSubjectParams): Promise<Subject> {
    return this.subjectsService.remove(params.subjectId);
  }
}
