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
import { Group } from '@App/entities/group.entity';
import { YearCourse } from '@App/entities/yearCourse.entity';
import { Subject } from '@App/entities/subject.entity';
import { Event } from '@App/entities/event.entity';
import { User } from '@App/entities/user.entity';
import { AddAdminDTO } from '@App/year-courses/dto/add-admin-dto';
import { RemoveAdminDTO } from '@App/year-courses/dto/remove-admin.dto';

describe('E2e scenario', () => {
  let user: User;
  let anotherUser: User;
  let yearCourse: YearCourse;
  let subject: Subject;
  let anotherSubject: Subject;
  let group: Group;
  let anotherGroup: Group;
  let event: Event;

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
    const createUserDto: CreateUserDTO = { email: 'test@test.pl', password: '123456' };
    const expectedResult = { id: expect.any(String), email: 'test@test.pl', password: '123456' };

    const response = await request(app.getHttpServer()).post('/users').send(createUserDto);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(expectedResult);

    user = response.body;
  });

  it('should create another user', async () => {
    const createUserDto: CreateUserDTO = { email: 'another@test.pl', password: '123456' };
    const expectedResult = { id: expect.any(String), email: 'another@test.pl', password: '123456' };

    const response = await request(app.getHttpServer()).post('/users').send(createUserDto);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(expectedResult);

    anotherUser = response.body;
  });

  it('should login', async () => {
    const loginDto = { email: 'test@test.pl', password: '123456' };
    const expectedResult = { id: expect.any(String), token: expect.any(String), email: 'test@test.pl' };

    const response = await request(app.getHttpServer()).post('/auth/login').send(loginDto);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(expectedResult);

    token = response.body.token;
  });

  it('should create year course', async () => {
    const createYearCourseDto: CreateYearCourseDTO = { name: 'name', startYear: new Date().getFullYear() };
    const expectedResult = { id: expect.any(String), name: 'name', startYear: new Date().getFullYear() };

    const response = await request(app.getHttpServer())
      .post('/yearCourses')
      .auth(token, { type: 'bearer' })
      .send(createYearCourseDto);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(expectedResult);

    yearCourse = response.body;
  });

  it('should create subject', async () => {
    const createSubjectDto: CreateSubjectDTO = { name: 'long name', shortName: 'short name' };
    const expectedResult = {
      id: expect.any(String),
      name: 'long name',
      shortName: 'short name',
      yearCourseId: yearCourse.id,
    };

    const response = await request(app.getHttpServer())
      .post('/yearCourses/' + yearCourse.id + '/subjects')
      .auth(token, { type: 'bearer' })
      .send(createSubjectDto);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(expectedResult);

    subject = response.body;
  });

  it('should create another subject', async () => {
    const createSubjectDto: CreateSubjectDTO = { name: 'another long name', shortName: 'another short name' };
    const expectedResult = {
      id: expect.any(String),
      name: 'another long name',
      shortName: 'another short name',
      yearCourseId: yearCourse.id,
    };

    const response = await request(app.getHttpServer())
      .post('/yearCourses/' + yearCourse.id + '/subjects')
      .auth(token, { type: 'bearer' })
      .send(createSubjectDto);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(expectedResult);

    anotherSubject = response.body;
  });

  it('should update subject', async () => {
    const updateSubjectDto: UpdateSubjectDTO = { name: 'updated long name', shortName: 'updated short name' };
    const expectedResult = {
      id: expect.any(String),
      name: 'updated long name',
      shortName: 'updated short name',
      yearCourseId: yearCourse.id,
    };

    const response = await request(app.getHttpServer())
      .put('/yearCourses/' + yearCourse.id + '/subjects/' + subject.id)
      .auth(token, { type: 'bearer' })
      .send(updateSubjectDto);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject(expectedResult);

    subject = response.body;
  });

  it('should update year course', async () => {
    const updateYearCourseDto: UpdateYearCourseDTO = { name: 'updated name', startYear: new Date().getFullYear() };
    const expectedResult = {
      id: yearCourse.id,
      name: 'updated name',
      startYear: new Date().getFullYear(),
    };

    const response = await request(app.getHttpServer())
      .put('/yearCourses/' + yearCourse.id)
      .auth(token, { type: 'bearer' })
      .send(updateYearCourseDto);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject(expectedResult);

    yearCourse = response.body;
  });

  it('should add admin to year course', async () => {
    const addAdminDto: AddAdminDTO = { email: anotherUser.email };
    const expectedResult = {
      id: yearCourse.id,
      admins: [user, anotherUser],
    };

    const response = await request(app.getHttpServer())
      .post('/yearCourses/' + yearCourse.id + '/admins')
      .auth(token, { type: 'bearer' })
      .send(addAdminDto);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(expectedResult);
  });

  it('should remove admin from year course', async () => {
    const expectedResult = {
      id: yearCourse.id,
      admins: [user],
    };

    const response = await request(app.getHttpServer())
      .delete('/yearCourses/' + yearCourse.id + '/admins/' + anotherUser.id)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject(expectedResult);
  });

  it('should create group', async () => {
    const createGroupDto: CreateGroupDto = { name: 'group name' };
    const expectedResult = { id: expect.any(String), name: 'group name', yearCourseId: yearCourse.id };

    const response = await request(app.getHttpServer())
      .post('/yearCourse/' + yearCourse.id + '/groups')
      .auth(token, { type: 'bearer' })
      .send(createGroupDto);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(expectedResult);

    group = response.body;
  });

  it('should create another group', async () => {
    const createGroupDto: CreateGroupDto = { name: 'another group name' };
    const expectedResult = { id: expect.any(String), name: 'another group name', yearCourseId: yearCourse.id };

    const response = await request(app.getHttpServer())
      .post('/yearCourse/' + yearCourse.id + '/groups')
      .auth(token, { type: 'bearer' })
      .send(createGroupDto);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(expectedResult);

    anotherGroup = response.body;
  });

  it('should update group', async () => {
    const updateGroupDto: UpdateGroupDto = { name: 'updated group name' };
    const expectedResult = { id: group.id, name: 'updated group name', yearCourseId: yearCourse.id };

    const response = await request(app.getHttpServer())
      .put('/groups/' + group.id)
      .auth(token, { type: 'bearer' })
      .send(updateGroupDto);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject(expectedResult);

    group = response.body;
  });

  it('should create event', async () => {
    const mockEvent: CreateEventDTO = {
      date: new Date('March 30, 2022 03:24:00').toString(),
      subjectId: subject.id,
      groups: [group.id],
      description: 'description',
      room: 'room',
    };

    const expectedResponse = {
      date: new Date('March 30, 2022 03:24:00').toString(),
      subjectId: subject.id,
      groups: [{ id: group.id }],
      description: 'description',
      room: 'room',
    };

    const response = await request(app.getHttpServer())
      .post('/yearCourse/' + yearCourse.id + '/events')
      .auth(token, { type: 'bearer' })
      .send(mockEvent);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(expectedResponse);

    event = response.body;
  });

  it('should update event', async () => {
    const updateEventDto: UpdateEventDTO = {
      date: new Date('March 30, 2022 06:25:00').toString(),
      subjectId: anotherSubject.id,
      groups: [anotherGroup.id],
      description: 'updated description',
      room: 'updated room',
    };

    const expectedResponse = {
      date: new Date('March 30, 2022 06:25:00').toString(),
      subjectId: anotherSubject.id,
      groups: [{ id: anotherGroup.id }],
      description: 'updated description',
      room: 'updated room',
    };

    const response = await request(app.getHttpServer())
      .put('/events/' + event.id)
      .auth(token, { type: 'bearer' })
      .send(updateEventDto);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject(expectedResponse);

    event = response.body;
  });

  it('should delete event', async () => {
    const response = await request(app.getHttpServer())
      .delete('/events/' + event.id)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject(event);
  });

  it('should delete subject', async () => {
    const response = await request(app.getHttpServer())
      .delete('/yearCourses/' + yearCourse.id + '/subjects/' + subject.id)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject(subject);
  });

  it('should delete group', async () => {
    const response = await request(app.getHttpServer())
      .delete('/groups/' + group.id)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject(group);
  });

  it('should delete year course', async () => {
    const response = await request(app.getHttpServer())
      .delete('/yearCourses/' + yearCourse.id)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject(yearCourse);
  });
});
