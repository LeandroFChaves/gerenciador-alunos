import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { Pessoa } from './pessoa.entity';
import { PessoasService } from './pessoas.service';
import { PessoaDto } from './dtos/pessoa.dto';

@Controller('pessoas')
export class PessoasController {
  constructor(private pessoasService: PessoasService) {}

  @Get()
  async listPessoas() {
    return await this.pessoasService.listPessoas();
  }

  @Get(':id')
  async findPessoaById(@Param('id') id): Promise<Pessoa> {
    return await this.pessoasService.findPessoaById(id);
  }

  @Post()
  async createPessoa(
    @Body(ValidationPipe) createPessoaDto: PessoaDto,
  ): Promise<Pessoa> {
    const pessoa = await this.pessoasService.createPessoa(createPessoaDto);
    return pessoa;
  }

  @Put(':id')
  async updatePessoa(
    @Body(ValidationPipe) updatePessoaDto: PessoaDto,
    @Param('id') id: string,
  ) {
    return this.pessoasService.updatePessoa(updatePessoaDto, id);
  }

  @Delete(':id')
  async deletePessoa(@Param('id') id: string) {
    await this.pessoasService.deletePessoa(id);
    return {
      message: 'Pessoa removida com sucesso.',
    };
  }
}
