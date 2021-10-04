import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Produto } from './produto.entity';
import { ProdutoDto } from './dtos/produto.dto';

@EntityRepository(Produto)
export class ProdutoRepository extends Repository<Produto> {
  async listProdutos(): Promise<{ produtos: Produto[]; total: number }> {
    const query = this.createQueryBuilder('produto');
    query.select(['produto']);

    const [produtos, total] = await query.getManyAndCount();

    return { produtos, total };
  }

  async createProduto(createProdutoDto: ProdutoDto): Promise<Produto> {
    try {
      const produto = this.create(createProdutoDto);

      await produto.save();

      return produto;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o produto no banco de dados.',
      );
    }
  }
}
