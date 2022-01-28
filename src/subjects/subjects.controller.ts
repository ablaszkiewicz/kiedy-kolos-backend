import { Controller, Get, UseGuards, Request, HttpException, HttpStatus, Body, Post, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Subject } from 'src/entities/subject.entity';
import { UsersService } from 'src/users/users.service';
import { SubjectsService } from './subjects.service';

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
  @Post('subjects')
  async createSubjectForUser(@Request() req, @Body() body): Promise<Subject> {
    const user = await this.usersService.getOneById(req.user.id);

    return this.subjectsService.createSubject(body.name, user);
  }
}
