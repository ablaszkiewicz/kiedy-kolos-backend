import {
  Controller,
  Get,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  Body,
  Post,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Subject } from 'src/entities/subject.entity';
import { UsersService } from 'src/users/users.service';
import { YearCoursesService } from 'src/year-courses/year-courses.service';
import { UpdateResult } from 'typeorm';
import { CreateSubjectDTO, UpdateSubjectDTO } from './dto';
import { HasRightsGuard } from './guards/has-rights.guard';
import { SubjectsService } from './subjects.service';

@ApiTags('subjects')
@Controller()
export class SubjectsController {
  constructor(private subjectsService: SubjectsService, private yearCourseService: YearCoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('subjects')
  async getSubjects(@Request() req): Promise<Subject[]> {
    return this.subjectsService.getAll();
  }

  @UseGuards(JwtAuthGuard, HasRightsGuard)
  @Get('yearCourses/:yearCourseId/subjects')
  async getSubjectsForYearCourse(@Param('yearCourseId') yearCourseId): Promise<Subject[]> {
    const yearCourse = await this.yearCourseService.getById(yearCourseId);

    return this.subjectsService.getByYearCourse(yearCourse);
  }

  @UseGuards(JwtAuthGuard, HasRightsGuard)
  @Post('yearCourses/:yearCourseId/subjects')
  async createSubject(@Param('yearCourseId') yearCourseId, @Body() body: CreateSubjectDTO): Promise<Subject> {
    const yearCourse = await this.yearCourseService.getById(yearCourseId);

    return this.subjectsService.create(body.name, body.shortName, yearCourse);
  }

  @UseGuards(JwtAuthGuard, HasRightsGuard)
  @Put('yearCourses/:yearCourseId/subjects')
  async updateSubject(@Param('yearCourseId') yearCourseId, @Body() body: UpdateSubjectDTO): Promise<Subject> {
    const yearCourse = await this.yearCourseService.getById(yearCourseId);
    return this.subjectsService.update(body.id, body.name, body.shortName, yearCourse);
  }

  @UseGuards(JwtAuthGuard, HasRightsGuard)
  @Delete('yearCourses/:yearCourseId/subjects/:id')
  async deleteSubject(@Param('id') id): Promise<Subject> {
    return this.subjectsService.delete(id);
  }
}
