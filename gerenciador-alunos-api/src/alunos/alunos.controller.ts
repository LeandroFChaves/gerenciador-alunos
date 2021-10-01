import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Aluno } from './aluno.entity';
import { AlunosService } from './alunos.service';
import { AlunoDto } from './dtos/aluno.dto';

@Controller('alunos')
export class AlunosController {
  constructor(private alunosService: AlunosService) {}

  @Get()
  async listAlunos() {
    return await this.alunosService.listAlunos();
  }

  @Get(':id')
  async findAlunoById(@Param('id') id): Promise<Aluno> {
    return await this.alunosService.findAlunoById(id);
  }

  @Post()
  async createAdminUser(@Body() createAlunoDto: AlunoDto): Promise<Aluno> {
    const aluno = await this.alunosService.createAluno(createAlunoDto);
    return aluno;
  }

  @Put(':id')
  async updateUser(@Body() updateAlunoDto: AlunoDto, @Param('id') id: string) {
    return this.alunosService.updateAluno(updateAlunoDto, id);
  }

  @Delete(':id')
  async deleteAluno(@Param('id') id: string) {
    await this.alunosService.deleteAluno(id);
    return {
      message: 'Aluno removido com sucesso.',
    };
  }
}
