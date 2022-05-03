import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GroupParams } from '@App/groups/params/GroupParams';
import { Group } from '@App/entities/group.entity';
import { JwtAuthGuard } from '@App/auth/guards/jwt-auth.guard';
import { YearCourseAdminGroupGuard } from '@App/groups/guards/year-course-admin-group.guard';
import { YearCourseParams } from '@App/groups/params/YearCourseParams';
import { YearCourseAdminParamsGuard } from '@App/guards/year-course-admin-params-guard';

@ApiBearerAuth()
@ApiTags('groups')
@Controller()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  // todo: for debugging, delete later on
  @Get('groups')
  async getAll(): Promise<Group[]> {
    return this.groupsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('yearCourse/:yearCourseId/groups')
  async getAllByYearCourse(@Param() params: YearCourseParams): Promise<Group[]> {
    return this.groupsService.getAllByYearCourse(params.yearCourseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('groups/:id')
  async getById(@Param() params: GroupParams): Promise<Group> {
    return this.groupsService.getById(params.id);
  }

  @UseGuards(JwtAuthGuard, YearCourseAdminParamsGuard)
  @Post('yearCourse/:yearCourseId/groups')
  async create(@Param() params: YearCourseParams, @Body() dto: CreateGroupDto): Promise<Group> {
    return this.groupsService.create(params.yearCourseId, dto);
  }

  @UseGuards(JwtAuthGuard, YearCourseAdminGroupGuard)
  @Put('groups/:id')
  async update(@Param() params: GroupParams, @Body() dto: UpdateGroupDto): Promise<Group> {
    return this.groupsService.update(params.id, dto);
  }

  @UseGuards(JwtAuthGuard, YearCourseAdminGroupGuard)
  @Delete('groups/:id')
  async delete(@Param() params: GroupParams): Promise<Group> {
    return this.groupsService.delete(params.id);
  }
}
