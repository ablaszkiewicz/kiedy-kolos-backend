import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && user.password === password) {
      return { id: user.id };
    }

    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id };

    return {
      token: this.jwtService.sign(payload),
      id: user.id,
    };
  }
}
