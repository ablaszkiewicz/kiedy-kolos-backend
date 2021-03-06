import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

class DummyDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Body() body: DummyDto): Promise<any> {
    return this.authService.login(req.user);
  }

  @Post('auth/google/login')
  async googleLogin(@Body() body: GoogleBody) {
    return this.authService.googleLogin(body.googleToken);
  }
}

interface GoogleBody {
  googleToken: string;
}
