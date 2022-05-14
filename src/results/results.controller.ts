import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { ResultsService } from './results.service';
import { UpdateResultDto } from './dto/update-result.dto';
import { JwtAuthGuard } from '@App/auth/guards/jwt-auth.guard';

@Controller('')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

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
  @Post('users/me/results/:taskId/:flag')
  checkTask(@Req() req, @Param('taskId') taskId: string, @Param('flag') flag: string) {
    return this.resultsService.checkTask(taskId, flag, req.user.id);
  }
}
