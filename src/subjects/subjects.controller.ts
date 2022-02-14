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
import { YearCoursesService } from 'src/year-courses/year-courses.service';
import { CreateSubjectDTO, UpdateSubjectDTO } from './dto';
import { HasRightsGuard } from './guards/has-rights.guard';
import { SubjectsService } from './subjects.service';

@ApiTags('subjects')
@Controller()
export class SubjectsController {
  constructor(private subjectsService: SubjectsService, private yearCourseService: YearCoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('subjects')
  async findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @UseGuards(JwtAuthGuard, HasRightsGuard)
  @Get('yearCourses/:yearCourseId/subjects')
  async findByYearCourse(@Param('yearCourseId') yearCourseId): Promise<Subject[]> {
    const yearCourse = await this.yearCourseService.findById(yearCourseId);

    return this.subjectsService.findByYearCourse(yearCourse);
  }

  @UseGuards(JwtAuthGuard, HasRightsGuard)
  @Post('yearCourses/:yearCourseId/subjects')
  async create(@Param('yearCourseId') yearCourseId, @Body() body: CreateSubjectDTO): Promise<Subject> {
    const yearCourse = await this.yearCourseService.findById(yearCourseId);

    return this.subjectsService.create(body.name, body.shortName, yearCourse);
  }

  @UseGuards(JwtAuthGuard, HasRightsGuard)
  @Put('yearCourses/:yearCourseId/subjects')
  async update(@Param('yearCourseId') yearCourseId, @Body() body: UpdateSubjectDTO): Promise<Subject> {
    const yearCourse = await this.yearCourseService.findById(yearCourseId);
    return this.subjectsService.update(body.id, body.name, body.shortName, yearCourse);
  }

  @UseGuards(JwtAuthGuard, HasRightsGuard)
  @Delete('yearCourses/:yearCourseId/subjects/:id')
  async remove(@Param('id') id): Promise<Subject> {
    return this.subjectsService.remove(id);
  }
}
