import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@App/entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Post()
  async create(@Body() dto: CreateUserDTO): Promise<User> {
    return this.usersService.createUser(dto);
  }
}
