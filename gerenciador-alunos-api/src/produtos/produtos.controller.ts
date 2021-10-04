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

import { Produto } from './produto.entity';
import { ProdutosService } from './produtos.service';
import { ProdutoDto } from './dtos/produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) {}

  @Get()
  async listProdutos() {
    return await this.produtosService.listProdutos();
  }

  @Get(':id')
  async findProdutoById(@Param('id') id): Promise<Produto> {
    return await this.produtosService.findProdutoById(id);
  }

  @Post()
  async createProduto(
    @Body(ValidationPipe) createProdutoDto: ProdutoDto,
  ): Promise<Produto> {
    const produto = await this.produtosService.createProduto(createProdutoDto);
    return produto;
  }

  @Put(':id')
  async updateProduto(
    @Body(ValidationPipe) updateProdutoDto: ProdutoDto,
    @Param('id') id: number,
  ) {
    return this.produtosService.updateProduto(updateProdutoDto, id);
  }

  @Delete(':id')
  async deleteProduto(@Param('id') id: number) {
    await this.produtosService.deleteProduto(id);
    return {
      message: 'Produto removida com sucesso.',
    };
  }
}
