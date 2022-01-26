import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { auth, driver, Session, session as neo4jsession } from 'neo4j-driver';
import { toString } from 'neo4j-driver-core';
import { session } from 'passport';

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

  private driver = driver(
    'neo4j+s://483c110d.databases.neo4j.io:7687',
    auth.basic('neo4j', 'udfXNjCFUrCUmVMP7hVDIdqRu6XCQfbNMjhdAHqLdDo'),
    { disableLosslessIntegers: true },
  );

  getSession(): Session {
    return this.driver.session({
      database: 'neo4j',
      defaultAccessMode: neo4jsession.READ,
    });
  }

  async findOne(email: string): Promise<User | undefined> {
    const currentSession = this.getSession();
    const query = `MATCH (n:User { email: $email }) RETURN ID(n) as id, n.email as email, n.password as password`;
    const params = { email: email };
    const response = await currentSession.run(query, params);
    currentSession.close();

    if (response.records.length > 0) {
      return {
        id: response.records[0].get('id'),
        email: response.records[0].get('email'),
        password: response.records[0].get('password'),
      };
    } else {
      return undefined;
    }
  }

  async create(email: string, password: string): Promise<void> {
    if ((await this.findOne(email)) !== undefined) {
      throw new HttpException(
        'Email is already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentSession = this.getSession();
    const query = `CREATE (n:User { email: $email, password: $password })`;
    const params = { email: email, password: password };
    await currentSession.run(query, params);
    currentSession.close();
  }
}
