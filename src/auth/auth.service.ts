import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@App/entities/user.entity';
import { UsersService } from '@App/users/users.service';
import { OAuth2Client } from 'google-auth-library';

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
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
    });
    const { email } = ticket.getPayload();

    console.log(email);

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
