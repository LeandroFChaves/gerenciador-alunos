import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PessoaRepository } from './pessoa.repository';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PessoaRepository])],
  providers: [PessoasService],
  controllers: [PessoasController],
})
export class PessoasModule {}
