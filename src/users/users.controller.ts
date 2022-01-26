import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('users/create')
  async create(@Body() body): Promise<void> {
    return this.usersService.create(body.email, body.password);
  }
}
