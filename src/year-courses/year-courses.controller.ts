import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateYearCourseDTO } from './dto';
import { YearCoursesService } from './year-courses.service';

@ApiTags('yearCourses')
@Controller('')
export class YearCoursesController {
  constructor(private readonly yearCourseService: YearCoursesService, private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('yearCourses')
  async getAllYearCourses(@Request() req) {
    return this.yearCourseService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/me/yearCourses')
  async getYearCoursesForUser(@Request() req) {
    const user = await this.usersService.getOneById(req.user.id);
    return this.yearCourseService.getByUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('yearCourses')
  async addYearCourse(@Request() req, @Body() body: CreateYearCourseDTO) {
    const user = await this.usersService.getOneById(req.user.id);
    return this.yearCourseService.create(user, body.name);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('yearCourses/:id')
  async deleteYearCourse(@Request() req, @Param() id: number) {
    return this.yearCourseService.delete(id);
  }
}
