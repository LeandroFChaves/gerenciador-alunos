import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Pessoa } from './pessoa.entity';
import { PessoaDto } from './dtos/pessoa.dto';
import { PessoaRepository } from './pessoa.repository';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(PessoaRepository)
    private pessoaRepository: PessoaRepository,
  ) {}

  async listPessoas(): Promise<{ pessoas: Pessoa[]; total: number }> {
    const pessoas = await this.pessoaRepository.listPessoas();
    return pessoas;
  }

  async findPessoaById(pessoaId: string): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.findOne(pessoaId, {
      select: ['id', 'nome', 'situacao'],
    });

    if (!pessoa) throw new NotFoundException('Pessoa não encontrado!');

    return pessoa;
  }

  async createPessoa(createPessoaDto: PessoaDto): Promise<Pessoa> {
    return this.pessoaRepository.createPessoa(createPessoaDto);
  }

  async updatePessoa(updatePessoaDto: PessoaDto, id: number) {
    const result = await this.pessoaRepository.update({ id }, updatePessoaDto);
    if (result.affected > 0) {
      const user = await this.findPessoaById(id);
      return user;
    } else {
      throw new NotFoundException('Pessoa não encontrado!');
    }
  }

  async deletePessoa(pessoaId: number) {
    const result = await this.pessoaRepository.delete({ id: pessoaId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado uma pessoa com o ID informado.',
      );
    }
  }
}
