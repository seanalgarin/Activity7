import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Get configuration from environment variables
  const port = process.env.PORT || 3000;
  const environment = process.env.NODE_ENV || 'development';
  const appName = process.env.APP_NAME || 'Task Management System API';
  const appVersion = process.env.APP_VERSION || '1.0.0';
  const corsOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:3000', 'http://localhost:3001'];

  // Enable CORS for frontend communication
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Enable validation pipes with detailed error messages
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger API Documentation setup
  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription('Comprehensive API documentation for the Task Management System')
    .setVersion(appVersion)
    .addTag('users', 'User management endpoints')
    .addTag('projects', 'Project management endpoints')
    .addTag('tasks', 'Task management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  // Professional startup messages
  logger.log('═══════════════════════════════════════════════════════════');
  logger.log(`${appName} v${appVersion}`);
  logger.log('═══════════════════════════════════════════════════════════');
  logger.log(`Environment: ${environment.toUpperCase()}`);
  logger.log(`Server: Running on port ${port}`);
  logger.log(`API: http://localhost:${port}`);
  logger.log(`Documentation: http://localhost:${port}/api`);
  logger.log(`CORS: Enabled for ${corsOrigins.length} origin(s)`);
  logger.log('═══════════════════════════════════════════════════════════');
  logger.log('Server is ready to accept connections');
  logger.log('═══════════════════════════════════════════════════════════');
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Failed to start application', error);
  process.exit(1);
});
