import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Produto } from './produto.entity';
import { ProdutoDto } from './dtos/produto.dto';
import { ProdutoRepository } from './produto.repository';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(ProdutoRepository)
    private produtoRepository: ProdutoRepository,
  ) {}

  async listProdutos(): Promise<{ produtos: Produto[]; total: number }> {
    const produtos = await this.produtoRepository.listProdutos();
    return produtos;
  }

  async findProdutoById(produtoId: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne(produtoId);

    if (!produto) throw new NotFoundException('Produto não encontrado!');

    return produto;
  }

  async createProduto(createProdutoDto: ProdutoDto): Promise<Produto> {
    return this.produtoRepository.createProduto(createProdutoDto);
  }

  async updateProduto(updateProdutoDto: ProdutoDto, id: number) {
    const result = await this.produtoRepository.update(
      { id },
      updateProdutoDto,
    );
    if (result.affected > 0) {
      const user = await this.findProdutoById(id);
      return user;
    } else {
      throw new NotFoundException('Produto não encontrado!');
    }
  }

  async deleteProduto(produtoId: number) {
    const result = await this.produtoRepository.delete({ id: produtoId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado uma produto com o ID informado.',
      );
    }
  }
}
