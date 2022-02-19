import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('E2e scenario', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create user', () => {
    return request(app.getHttpServer()).post('/users').send({ email: 'test@test.pl', password: '123456' }).expect(201);
  });

  it('login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.pl', password: '123456' })
      .expect(201);
  });

  it('create year course', () => {
    return request(app.getHttpServer())
      .post('/yearCourses')
      .send({ email: 'test@test.pl', password: '123456' })
      .expect(201);
  });
});
