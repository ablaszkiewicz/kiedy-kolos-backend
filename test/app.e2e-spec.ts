import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@App/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Response } from 'superagent';
import { CreateUserDTO } from '@App/users/dto/create-user.dto';
import { UpdateYearCourseDTO } from '@App/year-courses/dto/update-year-course.dto';
import { UpdateSubjectDTO } from '@App/subjects/dto/update-subject.dto';
import { CreateYearCourseDTO } from '@App/year-courses/dto/create-year-course.dto';
import { CreateSubjectDTO } from '@App/subjects/dto/create-subject.dto';

describe('E2e scenario', () => {
  const mockUser: CreateUserDTO = { email: 'test@test.pl', password: '123456' };
  const updatedSubject: UpdateSubjectDTO = { name: 'changed long name', shortName: 'changed short name' };
  const updatedYearCourse: UpdateYearCourseDTO = { name: 'updated name' };
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

  it('should create user', async () => {
    const response: Response = await request(app.getHttpServer())
      .post('/users')
      .send(mockUser);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(mockUser);
    expect(response.body).toHaveProperty("id");
  });

  it('should login', async () => {
    const response: Response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.pl', password: '123456' });

    expect(response.status).toBe(HttpStatus.CREATED)
    expect(response.body).toMatchObject({ email: 'test@test.pl'});
    const properties: string[] = ["id", "token"];
    properties.forEach((property) => expect(response.body).toHaveProperty(property));

    token = response.body.token;
  });

  it('should create year course', async () => {
    const createdYearCourse: CreateYearCourseDTO = { name: 'name' };
    const response: Response = await request(app.getHttpServer())
      .post('/yearCourses')
      .auth(token, { type: 'bearer' })
      .send(createdYearCourse);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toMatchObject(createdYearCourse);
  });

  it('should create subject', async () => {
    const createdSubject: CreateSubjectDTO = { name: 'long name', shortName: 'short name' };
    const response: Response = await request(app.getHttpServer())
      .post('/yearCourses/1/subjects')
      .auth(token, { type: 'bearer' })
      .send(createdSubject);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toMatchObject(createdSubject);
  });

  it('should update subject', async () => {
    const response: Response = await request(app.getHttpServer())
      .put('/yearCourses/1/subjects/1')
      .auth(token, { type: 'bearer' })
      .send(updatedSubject);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toMatchObject(updatedSubject);
  });

  it('should delete subject', async () => {
    const response: Response = await request(app.getHttpServer())
      .delete('/yearCourses/1/subjects/1')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toMatchObject(updatedSubject);
  });

  it('should update year course', async () => {
    const response: Response = await request(app.getHttpServer())
      .put('/yearCourses/1')
      .auth(token, { type: 'bearer' })
      .send(updatedYearCourse);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toMatchObject(updatedYearCourse);
  });

  it('should delete year course', async () => {
    const response: Response = await request(app.getHttpServer())
      .delete('/yearCourses/1')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toMatchObject(updatedYearCourse);
  });
});
