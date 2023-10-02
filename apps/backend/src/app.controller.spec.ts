import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users/users.controller';
import { DatabaseService } from './database/database.service';
import { UserDto } from './dto/user.dto';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('UsersController', () => {
  let app: INestApplication;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [DatabaseService],
    }).compile();

    app = module.createNestApplication();
    databaseService = module.get<DatabaseService>(DatabaseService);

    await app.init();
  });

  beforeEach(() => {
    databaseService.resetDatabase();
    databaseService.createDefaultUsers();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users', () => {
    it('should return an array of users', async () => {
      const response = await request(app.getHttpServer()).get('/users');

      expect(response.status).toBe(HttpStatus.OK);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by ID', async () => {
      const user = await databaseService.createUser({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
      });

      const response = await request(app.getHttpServer()).get(
        `/users/${user.id}`,
      );

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body[0].username).toBe(user.username);
    });

    it('should return [] if user does not exist', async () => {
      const response = await request(app.getHttpServer()).get('/users/9999');
      expect(response.body.length).toBe(0);
    });
  });

  describe('PUT /users', () => {
    it('can edit user', async () => {
      const response = await request(app.getHttpServer()).put('/users/1').send({
        id: '1',
        firstName: 'blah',
        lastName: 'User',
      });

      const refetch = await request(app.getHttpServer()).get('/users/1');

      expect(response.status).toBe(HttpStatus.OK);
      expect(refetch.body[0].firstName).toBe('blah');
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const userData = {
        username: 'newuser',
        firstName: 'New1234',
        lastName: 'User',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(userData);

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body.username).toBe(userData.username);
    });
    it('should error while creating user with invalid field length', async () => {
      const userData = {
        username: 'newusers',
        firstName: 'New',
        lastName: 'User',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(userData);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.details[0]).toBe(
        '"firstName" length must be at least 4 characters long',
      );
    });

    it('should return 400 if username already exists', async () => {
      const userData: UserDto = {
        username: 'user1',
        firstName: 'Duplicate',
        lastName: 'User',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(userData);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('DELETE /users', () => {
    it('can delete user', async () => {
      const response = await request(app.getHttpServer()).delete('/users/1');
      const refetch = await request(app.getHttpServer()).get('/users/1');

      expect(response.status).toBe(HttpStatus.OK);
      expect(refetch.body.length).toBe(0);
    });
  });

  // Add similar tests for PUT and DELETE routes
});
