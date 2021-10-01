import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Aluno } from './aluno.entity';
import { AlunoDto } from './dtos/aluno.dto';
import { AlunoRepository } from './aluno.repository';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(AlunoRepository)
    private alunoRepository: AlunoRepository,
  ) {}

  async listAlunos(): Promise<{ alunos: Aluno[]; total: number }> {
    const alunos = await this.alunoRepository.listAlunos();
    return alunos;
  }

  async findAlunoById(alunoId: string): Promise<Aluno> {
    const aluno = await this.alunoRepository.findOne(alunoId, {
      select: ['id', 'nome', 'situacao'],
    });

    if (!aluno) throw new NotFoundException('Aluno não encontrado!');

    return aluno;
  }

  async createAluno(createAlunoDto: AlunoDto): Promise<Aluno> {
    return this.alunoRepository.createAluno(createAlunoDto);
  }

  async updateAluno(updateAlunoDto: AlunoDto, id: string) {
    const result = await this.alunoRepository.update({ id }, updateAlunoDto);
    if (result.affected > 0) {
      const user = await this.findAlunoById(id);
      return user;
    } else {
      throw new NotFoundException('Aluno não encontrado!');
    }
  }

  async deleteAluno(alunoId: string) {
    const result = await this.alunoRepository.delete({ id: alunoId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um aluno com o ID informado.',
      );
    }
  }
}
