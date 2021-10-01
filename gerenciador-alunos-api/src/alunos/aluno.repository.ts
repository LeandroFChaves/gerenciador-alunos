import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Aluno } from './aluno.entity';
import { AlunoDto } from './dtos/aluno.dto';

@EntityRepository(Aluno)
export class AlunoRepository extends Repository<Aluno> {
  async listAlunos(): Promise<{ alunos: Aluno[]; total: number }> {
    const query = this.createQueryBuilder('aluno');
    query.select(['aluno.id', 'aluno.nome', 'aluno.situacao']);

    const [alunos, total] = await query.getManyAndCount();

    return { alunos, total };
  }

  async createAluno(createAlunoDto: AlunoDto): Promise<Aluno> {
    try {
      const aluno = this.create(createAlunoDto);

      await aluno.save();

      return aluno;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o aluno no banco de dados.',
      );
    }
  }
}
