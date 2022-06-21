import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@App/auth/guards/jwt-auth.guard';
import { UsersService } from '@App/users/users.service';
import { CreateYearCourseDTO } from './dto/create-year-course.dto';
import { YearCoursesService } from './year-courses.service';
import { YearCourseParams } from './params/YearCourseParams';
import { UpdateYearCourseDTO } from './dto/update-year-course.dto';
import { AddAdminDTO } from './dto/add-admin-dto';
import { YearCourseAdminParams } from './params/YearCourseAdminParams';
import { YearCourseAdminParamsGuard } from '@App/guards/year-course-admin-params-guard';
import { YearCourseUserParams } from './params/YearCourseUserParams';

@ApiBearerAuth()
@ApiTags('yearCourses')
@Controller('')
export class YearCoursesController {
  constructor(private readonly yearCourseService: YearCoursesService, private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('yearCourses')
  async findAll() {
    return this.yearCourseService.findAll();
  }

  @Get('yearCourses/:yearCourseId')
  async findById(@Param() params: YearCourseParams) {
    return this.yearCourseService.findById(params.yearCourseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/me/yearCourses')
  async findByAdminOrUserMe(@Request() req) {
    const user = await this.usersService.getOneById(req.user.id);

    const byAdmin = await this.yearCourseService.findByAdmin(user);
    const byUser = await this.yearCourseService.findByUser(user);

    return [...byAdmin, ...byUser].filter(
      (yearCourse, i, a) => a.findIndex((otherYearCourse) => otherYearCourse.id === yearCourse.id) === i
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('yearCourses')
  async create(@Request() req, @Body() dto: CreateYearCourseDTO) {
    const user = await this.usersService.getOneById(req.user.id);
    return this.yearCourseService.create(user, dto);
  }

  @UseGuards(JwtAuthGuard, YearCourseAdminParamsGuard)
  @Put('yearCourses/:yearCourseId')
  async update(@Param() params: YearCourseParams, @Body() dto: UpdateYearCourseDTO) {
    return this.yearCourseService.update(params.yearCourseId, dto);
  }

  // @UseGuards(JwtAuthGuard, YearCourseAdminParamsGuard)
  // @Delete('yearCourses/:yearCourseId')
  // async remove(@Param() params: YearCourseParams) {
  //   return this.yearCourseService.remove(params.yearCourseId);
  // }

  @UseGuards(JwtAuthGuard)
  @Post('yearCourses/:yearCourseId/admins')
  async addAdmin(@Param() params: YearCourseParams, @Body() dto: AddAdminDTO) {
    const user = await this.usersService.getOneByEmail(dto.email);
    return this.yearCourseService.addAdmin(params.yearCourseId, user);
  }

  @UseGuards(JwtAuthGuard, YearCourseAdminParamsGuard)
  @Delete('yearCourses/:yearCourseId/admins/:adminId')
  async removeAdmin(@Param() params: YearCourseAdminParams) {
    const user = await this.usersService.getOneById(params.adminId);
    return this.yearCourseService.removeAdmin(params.yearCourseId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('yearCourses/:yearCourseId/users')
  async addUser(@Req() req, @Param() params: YearCourseParams) {
    const userId = req.user.id;
    return this.yearCourseService.addUser(params.yearCourseId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('yearCourses/:yearCourseId/users')
  async removeUser(@Req() req, @Param() params: YearCourseUserParams) {
    const userId = req.user.id;
    return this.yearCourseService.removeUser(params.yearCourseId, userId);
  }
}
