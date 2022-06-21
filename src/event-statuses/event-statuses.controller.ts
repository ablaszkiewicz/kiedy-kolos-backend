import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EventStatusesService } from './event-statuses.service';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';
import { JwtAuthGuard } from '@App/auth/guards/jwt-auth.guard';

@Controller('event-statuses')
export class EventStatusesController {
  constructor(private readonly eventStatusesService: EventStatusesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  create(@Req() req, @Body() dto: UpdateEventStatusDto) {
    console.log('Asd');
    dto.userId = req.user.id;
    return this.eventStatusesService.update(dto);
  }
}
