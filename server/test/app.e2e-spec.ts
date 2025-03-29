/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from 'src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Register user (optional if running multiple times)
    await request(app.getHttpServer()).post('/auth/register').send({
      email: 'test.user@example.com',
      name: 'Test User',
      password: 'StrongP@ssw0rd!',
    });

    // Login user to obtain tokens
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test.user@example.com',
        password: 'StrongP@ssw0rd!',
      })
      .expect(201);

    accessToken = loginRes.body.tokens.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET / (unauthorized)', async () => {
    return request(app.getHttpServer()).get('/').expect(401);
  });

  it('GET / (authorized)', async () => {
    const response = await request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.email).toBe('test.user@example.com');
    expect(response.body.name).toBe('Test User');
  });
});
