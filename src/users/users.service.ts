import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'anna@pg.edu.pl',
      password: '123',
    },
    {
      id: 2,
      email: 'tomasz@pg.edu.pl',
      password: '123',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
