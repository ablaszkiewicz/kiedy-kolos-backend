import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateYearCourseDTO } from './dto';
import { YearCoursesService } from './year-courses.service';

@Controller('yearCourses')
export class YearCoursesController {
  constructor(private readonly yearCourseService: YearCoursesService, private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllYearCourses(@Request() req) {
    return this.yearCourseService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async addYearCourse(@Request() req, @Body() body: CreateYearCourseDTO) {
    const user = await this.usersService.getOneById(req.user.id);
    return this.yearCourseService.create(user, body.name);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteYearCourse(@Request() req, @Param() id: number) {
    return this.yearCourseService.delete(id);
  }
}
