import {
  Controller,
  Get,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  Body,
  Post,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Subject } from 'src/entities/subject.entity';
import { UsersService } from 'src/users/users.service';
import { UpdateResult } from 'typeorm';
import { CreateSubjectDTO, UpdateSubjectDTO } from './dto';
import { HasRightsGuard } from './guards/has-rights.guard';
import { SubjectsService } from './subjects.service';

@ApiTags('subjects')
@Controller()
export class SubjectsController {
  constructor(private subjectsService: SubjectsService, private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('subjects')
  async getSubjects(@Request() req): Promise<Subject[]> {
    return this.subjectsService.getAllSubjects();
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/me/subjects')
  async getSubjectsForUser(@Request() req): Promise<Subject[]> {
    const user = await this.usersService.getOneById(req.user.id);

    return this.subjectsService.getSubjectsByOwner(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/me/subjects')
  async createSubjectForUser(@Request() req, @Body() body: CreateSubjectDTO): Promise<Subject> {
    const user = await this.usersService.getOneById(req.user.id);

    return this.subjectsService.createSubject(body.name, body.shortName, user);
  }

  @UseGuards(JwtAuthGuard, HasRightsGuard)
  @Put('users/me/subjects')
  async updateSubjectForUser(@Request() req, @Body() body: UpdateSubjectDTO): Promise<Subject> {
    return this.subjectsService.updateSubject(body.id, body.name, body.shortName);
  }

  @UseGuards(JwtAuthGuard, HasRightsGuard)
  @Delete('users/me/subjects/:id')
  async deleteSubjectForUser(@Request() req, @Param('id') id): Promise<Subject> {
    return this.subjectsService.deleteSubject(id, req.user.id);
  }
}
