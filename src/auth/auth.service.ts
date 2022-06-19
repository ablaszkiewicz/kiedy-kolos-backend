import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@App/entities/user.entity';
import { UsersService } from '@App/users/users.service';
import axios from 'axios';

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

  async googleLogin(googleToken: string) {
    const response = await axios.post(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${googleToken}`);
    const email = response.data.email;

    let user = await this.usersService.getOneByEmail(email);

    if (!user) {
      await this.usersService.createUser({ email, password: '12345678' });
      user = await this.usersService.getOneByEmail(email);
    }

    const payload = { email: user.email, sub: user.id };

    return {
      id: user.id,
      email: email,
      token: this.jwtService.sign(payload),
    };
  }
}
