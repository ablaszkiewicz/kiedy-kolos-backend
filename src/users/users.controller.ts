import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@App/entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@App/auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMyDetails(@Req() req): Promise<User> {
    return this.usersService.getMyDetails(req.user.id);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':email')
  async getOne(@Param('email') email: string): Promise<User> {
    const user = await this.usersService.getOneByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Post()
  async create(@Body() dto: CreateUserDTO): Promise<User> {
    return this.usersService.createUser(dto);
  }
}
