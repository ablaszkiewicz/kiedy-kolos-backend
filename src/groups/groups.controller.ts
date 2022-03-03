import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GroupParams } from '@App/groups/params/GroupParams';
import { Group } from '@App/entities/group.entity';
import { YearCourseParams } from '@App/subjects/params/YearCourseParams';
import { JwtAuthGuard } from '@App/auth/guards/jwt-auth.guard';
import { GroupsRightsGuard } from '@App/groups/guards/groups-rights.guard';

@ApiBearerAuth()
@ApiTags('groups')
@Controller()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard, GroupsRightsGuard)
  @Post('yearCourse/:yearCourseId/groups')
  async create(@Param() params: YearCourseParams, @Body() body: CreateGroupDto): Promise<Group> {
    return this.groupsService.create(body.name, params.yearCourseId);
  }

  // todo: for debugging, delete later on
  @Get('groups')
  async getAll(): Promise<Group[]> {
    return this.groupsService.getAll();
  }

  @UseGuards(JwtAuthGuard, GroupsRightsGuard)
  @Get('yearCourse/:yearCourseId/groups')
  async getAllByYearCourse(@Param() params: YearCourseParams): Promise<Group[]> {
    return this.groupsService.getAllByYearCourse(params.yearCourseId);
  }

  @UseGuards(JwtAuthGuard, GroupsRightsGuard)
  @Get('groups/:id')
  async getById(@Param() params: GroupParams): Promise<Group> {
    return this.groupsService.getById(params.id);
  }

  @UseGuards(JwtAuthGuard, GroupsRightsGuard)
  @Put('groups/:id')
  async update(@Param() params: GroupParams, @Body() body: UpdateGroupDto): Promise<Group> {
    return this.groupsService.update(params.id, body.name);
  }

  @UseGuards(JwtAuthGuard, GroupsRightsGuard)
  @Delete('groups/:id')
  async delete(@Param() params: GroupParams): Promise<Group> {
    return this.groupsService.delete(params.id);
  }
}
