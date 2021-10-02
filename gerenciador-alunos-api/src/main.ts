import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';
import { logConfig } from './configs/logs.config';

async function bootstrap() {
  const logger = WinstonModule.createLogger(logConfig);
  const app = await NestFactory.create(AppModule, { logger });

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Authorization, Content-Type, Accept',
  });

  await app.listen(3000);
}
bootstrap();
