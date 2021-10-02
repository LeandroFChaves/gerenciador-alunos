import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { logConfig } from './configs/logs.config';

import { postgreSQLConfig } from './configs/postgresql.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AlunosModule } from './alunos/alunos.module';
import { LoggerInterceptor } from './interceptors/logger.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgreSQLConfig),
    WinstonModule.forRoot(logConfig),
    AuthModule,
    AlunosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
