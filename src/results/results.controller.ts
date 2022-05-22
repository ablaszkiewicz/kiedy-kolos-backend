import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { ResultsService } from './results.service';
import { UpdateResultDto } from './dto/update-result.dto';
import { JwtAuthGuard } from '@App/auth/guards/jwt-auth.guard';
import { UsersService } from '@App/users/users.service';

@Controller('')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService, private usersService: UsersService) {}

  @Get('results')
  getAllResults() {
    return this.resultsService.getAllResults();
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/me/results')
  getMyResults(@Req() req) {
    return this.resultsService.getMyResults(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/me/results')
  sign(@Req() req) {
    return this.resultsService.sign(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/me/results/1')
  async checkTask1(@Req() req) {
    const user = await this.usersService.getOneById(req.user.id);
    return this.resultsService.checkTask1(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/me/results/2/:flag')
  checkTask2(@Req() req, @Param('flag') flag: string) {
    return this.resultsService.checkTask2(flag, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/me/results/3')
  async checkTask3(@Req() req) {
    const user = await this.usersService.getOneById(req.user.id);
    return this.resultsService.checkTask3(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/me/results/4/:flag')
  checkTask4(@Req() req, @Param('flag') flag: string) {
    return this.resultsService.checkTask4(flag, req.user.id);
  }
}
