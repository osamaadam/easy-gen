import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Enable CORS
  app.enableCors({
    origin: '*',
  });

  // Pino logger setup
  app.useLogger(app.get(Logger));

  // Enable class-transformer and class-validator globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Easygenerator API')
    .setDescription('The Easygenerator API description')
    .setVersion('1.0')
    .addTag('easygenerator')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      flows: {
        password: {
          tokenUrl: '/auth/login',
          authorizationUrl: '/auth/login',
          refreshUrl: '/auth/refresh',
          scopes: {},
        },
      },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Error starting the server:', err);
  process.exit(1);
});
