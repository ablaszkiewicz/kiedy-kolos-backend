import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@App/entities/user.entity';
import { UsersService } from '@App/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getOneByEmail(email);

    if (user && user.password === password) {
      return { id: user.id, email: user.email };
    }

    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };

    return {
      id: user.id,
      email: user.email,
      token: this.jwtService.sign(payload),
    };
  }
}
