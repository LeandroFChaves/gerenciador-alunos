import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { logConfig } from './configs/logs.config';

import { postgreSQLConfig } from './configs/postgresql.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { ProdutosModule } from './produtos/produtos.module';
import { VendasModule } from './vendas/vendas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgreSQLConfig),
    WinstonModule.forRoot(logConfig),
    AuthModule,
    PessoasModule,
    ProdutosModule,
    VendasModule,
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
