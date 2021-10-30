import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Pessoa } from './pessoa.entity';
import { PessoaDto } from './dtos/pessoa.dto';

@EntityRepository(Pessoa)
export class PessoaRepository extends Repository<Pessoa> {
  async listPessoas(): Promise<{ pessoas: Pessoa[]; total: number }> {
    const query = this.createQueryBuilder('pessoa');
    query.select(['pessoa']);

    const [pessoas, total] = await query.getManyAndCount();

    return { pessoas, total };
  }

  async getMaxNumRa(): Promise<string> {
    const query = this.createQueryBuilder('pessoa');
    query.select('MAX(pessoa.ra)', 'max');

    const result = await query.getRawOne();

    return result.max;
  }

  async createPessoa(createPessoaDto: PessoaDto): Promise<Pessoa> {
    try {
      const pessoa = this.create(createPessoaDto);

      await pessoa.save();

      return pessoa;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o pessoa no banco de dados.',
      );
    }
  }
}
