import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ExtendedSocketIoAdapter } from './app/shared/webSocket/socketAdapter';

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file

  const app = await NestFactory.create(AppModule);

 // Enable CORS
 app.enableCors();

 app.useWebSocketAdapter(new ExtendedSocketIoAdapter(app.getHttpServer()));

  await app.listen(3000);
}
bootstrap();
