import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateYearCourseDTO } from './dto/create-year-course.dto';
import { YearCoursesService } from './year-courses.service';
import { YearCourseParams } from './params/YearCourseParams';

@ApiBearerAuth()
@ApiTags('yearCourses')
@Controller('')
export class YearCoursesController {
  constructor(private readonly yearCourseService: YearCoursesService, private readonly usersService: UsersService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('yearCourses')
  async findAll() {
    return this.yearCourseService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/me/yearCourses')
  async findByAdmin(@Request() req) {
    const user = await this.usersService.getOneById(req.user.id);
    return this.yearCourseService.findByAdmin(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('yearCourses')
  async create(@Request() req, @Body() body: CreateYearCourseDTO) {
    const user = await this.usersService.getOneById(req.user.id);
    return this.yearCourseService.create(user, body.name);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('yearCourses/:yearCourseId')
  async remove(@Request() req, @Param() params: YearCourseParams) {
    return this.yearCourseService.remove(params.yearCourseId);
  }
}
