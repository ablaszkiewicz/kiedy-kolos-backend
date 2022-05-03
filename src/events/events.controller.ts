import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { YearCourseParams } from './params/YearCourseParams';
import { EventsParams } from './params/EventsParams';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@App/auth/guards/jwt-auth.guard';
import { YearCourseAdminParamsGuard } from '@App/guards/year-course-admin-params-guard';

@ApiBearerAuth()
@ApiTags('events')
@Controller('')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('events')
  getAllEvents() {
    return this.eventsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('yearCourse/:yearCourseId/events')
  getAllByYearCourse(@Param() params: YearCourseParams) {
    return this.eventsService.getAllByYearCourse(params.yearCourseId);
  }

  @UseGuards(JwtAuthGuard, YearCourseAdminParamsGuard)
  @Post('yearCourse/:yearCourseId/events')
  create(@Param() params: YearCourseParams, @Body() dto: CreateEventDTO) {
    return this.eventsService.create(params.yearCourseId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('events/:id')
  update(@Param() params: EventsParams, @Body() dto: UpdateEventDTO) {
    return this.eventsService.update(params.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('events/:id')
  delete(@Param() params: EventsParams) {
    return this.eventsService.delete(params.id);
  }
}
