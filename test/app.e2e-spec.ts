import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@App/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Response } from 'superagent';
import { UpdateYearCourseDTO } from '@App/year-courses/dto/update-year-course.dto';
import { UpdateSubjectDTO } from '@App/subjects/dto/update-subject.dto';
import { CreateYearCourseDTO } from '@App/year-courses/dto/create-year-course.dto';
import { CreateSubjectDTO } from '@App/subjects/dto/create-subject.dto';
import { CreateGroupDto } from '@App/groups/dto/create-group.dto';
import { v4 as uuid } from 'uuid';
import { UpdateGroupDto } from '@App/groups/dto/update-group.dto';
import { CreateUserDTO } from '@App/users/dto/create-user.dto';
import { CreateEventDTO } from '@App/events/dto/create-event.dto';
import { UpdateEventDTO } from '@App/events/dto/update-event.dto';
import { group } from 'console';
import { Group } from '@App/entities/group.entity';

describe('E2e scenario', () => {
  let userId: uuid;
  let subjectId: uuid;
  let yearCourseId: uuid;
  let groupId: uuid;
  let secondGroup: Group;
  let eventId: uuid;

  const updatedSubject: UpdateSubjectDTO = { name: 'changed long name', shortName: 'changed short name' };
  const updatedYearCourse: UpdateYearCourseDTO = { name: 'updated name', startYear: new Date().getFullYear() };
  const updatedGroup: UpdateGroupDto = { name: 'updated group name' };
  const updatedEvent: UpdateEventDTO = {
    date: new Date('March 30, 2022 21:37:00').toString(),
    subjectId: '',
    groups: [],
  };

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
    const mockUser: CreateUserDTO = { email: 'test@test.pl', password: '123456' };
    const response: Response = await request(app.getHttpServer()).post('/users').send(mockUser);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(mockUser);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id;
  });

  it('should login', async () => {
    const response: Response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.pl', password: '123456' });

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject({ email: 'test@test.pl' });
    const properties: string[] = ['id', 'token'];
    properties.forEach((property) => expect(response.body).toHaveProperty(property));

    token = response.body.token;
  });

  it('should create year course', async () => {
    const createdYearCourse: CreateYearCourseDTO = { name: 'name', startYear: new Date().getFullYear() };
    const response: Response = await request(app.getHttpServer())
      .post('/yearCourses')
      .auth(token, { type: 'bearer' })
      .send(createdYearCourse);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(createdYearCourse);
    expect(response.body).toHaveProperty('id');

    yearCourseId = response.body.id;
  });

  it('should create subject', async () => {
    const createdSubject: CreateSubjectDTO = { name: 'long name', shortName: 'short name' };
    const response: Response = await request(app.getHttpServer())
      .post('/yearCourses/' + yearCourseId + '/subjects')
      .auth(token, { type: 'bearer' })
      .send(createdSubject);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(createdSubject);
    expect(response.body).toHaveProperty('id');

    subjectId = response.body.id;
  });

  it('should create another subject', async () => {
    const createdSubject: CreateSubjectDTO = { name: 'long name', shortName: 'short name' };
    const response: Response = await request(app.getHttpServer())
      .post('/yearCourses/' + yearCourseId + '/subjects')
      .auth(token, { type: 'bearer' })
      .send(createdSubject);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(createdSubject);
    expect(response.body).toHaveProperty('id');

    updatedEvent.subjectId = response.body.id;
  });

  it('should update subject', async () => {
    const response: Response = await request(app.getHttpServer())
      .put('/yearCourses/' + yearCourseId + '/subjects/' + subjectId)
      .auth(token, { type: 'bearer' })
      .send(updatedSubject);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject(updatedSubject);
  });

  it('should update year course', async () => {
    const response: Response = await request(app.getHttpServer())
      .put('/yearCourses/' + yearCourseId)
      .auth(token, { type: 'bearer' })
      .send(updatedYearCourse);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject(updatedYearCourse);
  });

  it('should create group', async () => {
    const mockGroup: CreateGroupDto = { name: 'foo group bar' };
    const response: Response = await request(app.getHttpServer())
      .post('/yearCourse/' + yearCourseId + '/groups')
      .auth(token, { type: 'bearer' })
      .send(mockGroup);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(mockGroup);
    expect(response.body).toHaveProperty('id');

    groupId = response.body.id;
  });

  it('should update group', async () => {
    const response: Response = await request(app.getHttpServer())
      .put('/groups/' + groupId)
      .auth(token, { type: 'bearer' })
      .send(updatedGroup);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject(updatedGroup);
  });

  it('should create event', async () => {
    const mockEvent: CreateEventDTO = {
      date: new Date('March 30, 2022 03:24:00').toString(),
      subjectId: subjectId,
      groups: [groupId],
    };

    const expectedResponse = {
      date: new Date('March 30, 2022 03:24:00').toString(),
      subjectId: subjectId,
      groups: [{ id: groupId }],
    };

    const response: Response = await request(app.getHttpServer())
      .post('/yearCourse/' + yearCourseId + '/events')
      .auth(token, { type: 'bearer' })
      .send(mockEvent);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(expectedResponse);
    expect(response.body).toHaveProperty('id');

    console.log(response.body);

    eventId = response.body.id;
  });

  it('should update event', async () => {
    const response: Response = await request(app.getHttpServer())
      .put('/events/' + eventId)
      .auth(token, { type: 'bearer' })
      .send(updatedEvent);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject(updatedEvent);
    expect(response.body).toHaveProperty('id');
  });

  it('should delete event', async () => {
    const response: Response = await request(app.getHttpServer())
      .delete('/events/' + eventId)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject(updatedEvent);
    expect(response.body).toHaveProperty('id');
  });

  it('should delete subject', async () => {
    const response: Response = await request(app.getHttpServer())
      .delete('/yearCourses/' + yearCourseId + '/subjects/' + subjectId)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject(updatedSubject);
  });

  it('should delete group', async () => {
    const response: Response = await request(app.getHttpServer())
      .delete('/groups/' + groupId)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject(updatedGroup);
  });

  it('should delete year course', async () => {
    const response: Response = await request(app.getHttpServer())
      .delete('/yearCourses/' + yearCourseId)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject(updatedYearCourse);
  });
});
