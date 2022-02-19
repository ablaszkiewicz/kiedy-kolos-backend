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

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('create user', () => {
    return request(app.getHttpServer()).post('/users').send({ email: 'test@test.pl', password: '123456' }).expect(200);
  });

  it('login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.pl', password: '123456' })
      .expect(201)
      .then((res) => (token = res.body.token));
  });

  it('create year course', () => {
    return request(app.getHttpServer())
      .post('/yearCourses')
      .auth(token, { type: 'bearer' })
      .send({ name: 'name' })
      .expect(201);
  });

  it('create subject', () => {
    return request(app.getHttpServer())
      .post('/yearCourses/1/subjects')
      .auth(token, { type: 'bearer' })
      .send({ name: 'long name', shortName: 'short name' })
      .expect(201);
  });

  it('update subject', () => {
    return request(app.getHttpServer())
      .put('/yearCourses/1/subjects/1')
      .auth(token, { type: 'bearer' })
      .send({ name: 'changed long name', shortName: 'changed short name' })
      .expect(200);
  });

  it('delete subject', () => {
    return request(app.getHttpServer()).delete('/yearCourses/1/subjects/1').auth(token, { type: 'bearer' }).expect(200);
  });

  it('update year course', () => {
    return request(app.getHttpServer())
      .put('/yearCourses/1')
      .auth(token, { type: 'bearer' })
      .send({ name: 'updated name' })
      .expect(200);
  });

  it('delete year course', () => {
    return request(app.getHttpServer()).delete('/yearCourses/1').auth(token, { type: 'bearer' }).expect(200);
  });
});
