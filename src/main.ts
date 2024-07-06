import { NestFactory } from '@nestjs/core';

import * as dotenv from 'dotenv';
import { json } from 'express';
import * as express from 'express';

import { AppModule } from './app.module';
import { ExtendedSocketIoAdapter } from './app/shared/webSocket/socketAdapter';

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file

  const app = await NestFactory.create(AppModule);
  app.use('/assets', express.static('src/assets'));
  // Enable CORS
  app.enableCors();

  app.useWebSocketAdapter(new ExtendedSocketIoAdapter(app.getHttpServer()));

  await app.listen(3000);
}
bootstrap();
