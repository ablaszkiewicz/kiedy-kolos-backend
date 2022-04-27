import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { YearCourseParams } from './params/YearCourseParams';
import { EventsParams } from './params/EventsParams';

@Controller('')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('events')
  getAllEvents() {
    return this.eventsService.getAll();
  }

  @Get('yearCourse/:yearCourseId/events')
  getAllByYearCourse(@Param() params: YearCourseParams) {
    return this.eventsService.getAllByYearCourse(params.yearCourseId);
  }

  @Post('yearCourse/:yearCourseId/events')
  create(@Param() params: YearCourseParams, @Body() createEventDto: CreateEventDTO) {
    return this.eventsService.create(params.yearCourseId, createEventDto.date, createEventDto.subjectId);
  }

  @Put('events/:id')
  update(@Param() params: EventsParams, @Body() updateEventDto: UpdateEventDTO) {
    return this.eventsService.update(params.id, updateEventDto.date, updateEventDto.subjectId);
  }

  @Delete('events/:id')
  delete(@Param() params: EventsParams) {
    return this.eventsService.delete(params.id);
  }
}
