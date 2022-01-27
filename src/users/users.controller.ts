import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() body): Promise<User> {
    return this.usersService.createUser(body.email, body.password);
  }
}
