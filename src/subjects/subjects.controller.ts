import { Body, Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('subjects')
export class SubjectsController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getSubjects(@Request() req, @Body() body): any {
    return {
      id: req.user.id,
      content: 'hello',
    };
  }
}
