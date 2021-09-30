import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { postgreSQLConfig } from './configs/postgresql.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(postgreSQLConfig), AlunosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
