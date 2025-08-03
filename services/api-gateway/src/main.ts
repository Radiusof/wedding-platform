import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Configuration CORS
  app.enableCors({
    origin: [
      'http://localhost:8080', // Frontend Vue.js
      'http://localhost:3000', // API Gateway
      'http://localhost:4173', // Vite preview
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
  });

  // Validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Préfixe global pour l'API (temporairement désactivé)
  // app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  logger.log(`🚀 API Gateway is running on: http://localhost:${port}`);
  logger.log(`📊 Health check: http://localhost:${port}/health`);
  logger.log(`🔍 Services info: http://localhost:${port}/services`);
}
bootstrap();
