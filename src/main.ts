import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Statik dosyaların bulunduğu klasörü belirtin
  app.use(express.static(path.join(__dirname, '..', 'public')));

  await app.listen(3000);
  console.log('Server is running on http://localhost:3000');
}
bootstrap();
