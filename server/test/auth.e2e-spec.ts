/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from 'src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;
  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/register (register user)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test.user@example.com',
        name: 'Test User',
        password: 'StrongP@ssw0rd!',
      })
      .expect(201);

    expect(response.body.tokens).toBeDefined();
    expect(response.body.user).toBeDefined();
  });

  it('POST /auth/login (login user)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test.user@example.com',
        password: 'StrongP@ssw0rd!',
      })
      .expect(201);

    accessToken = response.body.tokens.accessToken;
    refreshToken = response.body.tokens.refreshToken;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  it('GET /auth/refresh (refresh token)', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/refresh')
      .set('Authorization', `Bearer ${refreshToken}`)
      .expect(200);

    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
  });

  it('GET / (protected endpoint)', async () => {
    await request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});
