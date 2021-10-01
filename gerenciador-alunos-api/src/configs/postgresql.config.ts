import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const postgreSQLConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'gerenciador-alunos',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
