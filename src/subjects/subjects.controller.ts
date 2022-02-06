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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Subject } from 'src/entities/subject.entity';
import { UsersService } from 'src/users/users.service';
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
  async createSubjectForUser(@Request() req, @Body() body): Promise<Subject> {
    const user = await this.usersService.getOneById(req.user.id);

    return this.subjectsService.createSubject(body.name, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/me/subjects/:id')
  async deleteSubjectForUser(@Request() req, @Param('id') id): Promise<Subject> {
    const user = await this.usersService.getOneById(req.user.id);
    const subject = await this.subjectsService.getSubjectByIdAndOwner(id, user);

    if (!subject) {
      throw new HttpException('You are not the owner of provided subject', HttpStatus.BAD_REQUEST);
    }

    return this.subjectsService.deleteSubject(id);
  }
}
