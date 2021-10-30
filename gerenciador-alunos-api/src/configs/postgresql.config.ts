import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const synchronize = this.configService.get<string>(
      'DATABASE_SYNCHRONIZE',
      'false',
    );

    return {
      type: this.configService.get<any>('DATABASE_TYPE', 'postgres'),
      host: this.configService.get<string>('DATABASE_HOST', 'localhost'),
      port: this.configService.get<number>('DATABASE_PORT', 5432),
      database: this.configService.get<string>(
        'DATABASE_NAME',
        'gerenciador-alunos',
      ),
      username: this.configService.get<string>('DATABASE_USERNAME', 'admin'),
      password: this.configService.get<string>('DATABASE_PASSWORD', 'admin'),
      synchronize: synchronize === 'true',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
    };
  }
}
