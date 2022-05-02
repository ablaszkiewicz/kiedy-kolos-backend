import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@App/auth/guards/jwt-auth.guard';
import { UsersService } from '@App/users/users.service';
import { CreateYearCourseDTO } from './dto/create-year-course.dto';
import { YearCoursesService } from './year-courses.service';
import { YearCourseParams } from './params/YearCourseParams';
import { UpdateYearCourseDTO } from './dto/update-year-course.dto';
import { AddAdminDTO } from './dto/add-admin-dto';

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

  @UseGuards(JwtAuthGuard)
  @Get('users/me/yearCourses')
  async findByAdmin(@Request() req) {
    const user = await this.usersService.getOneById(req.user.id);
    return this.yearCourseService.findByAdmin(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('yearCourses')
  async create(@Request() req, @Body() dto: CreateYearCourseDTO) {
    const user = await this.usersService.getOneById(req.user.id);
    return this.yearCourseService.create(user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('yearCourses/:yearCourseId')
  async update(@Param() params: YearCourseParams, @Body() dto: UpdateYearCourseDTO) {
    return this.yearCourseService.update(params.yearCourseId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('yearCourses/:yearCourseId')
  async remove(@Param() params: YearCourseParams) {
    return this.yearCourseService.remove(params.yearCourseId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('yearCourses/:yearCourseId/admins')
  async addAdmin(@Param() params: YearCourseParams, @Body() dto: AddAdminDTO) {
    const user = await this.usersService.getOneByEmail(dto.email);
    return this.yearCourseService.addAdmin(params.yearCourseId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('yearCourses/:yearCourseId/admins')
  async removeAdmin(@Param() params: YearCourseParams, @Body() dto: AddAdminDTO) {
    const user = await this.usersService.getOneByEmail(dto.email);
    return this.yearCourseService.removeAdmin(params.yearCourseId, user);
  }
}
