import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Venda } from './venda.entity';
import { VendaDto } from './dtos/venda.dto';

@EntityRepository(Venda)
export class VendaRepository extends Repository<Venda> {
  async listVendas(): Promise<{ vendas: Venda[]; total: number }> {
    const query = this.createQueryBuilder('venda')
      .leftJoinAndSelect('venda.itensVenda', 'itensVenda')
      .leftJoinAndSelect('venda.pessoaCliente', 'cliente')
      .leftJoinAndSelect('venda.pessoaVendedor', 'vendedor')
      .select(['venda', 'itensVenda', 'cliente', 'vendedor']);

    const [vendas, total] = await query.getManyAndCount();

    return { vendas, total };
  }

  async createVenda(createVendaDto: VendaDto): Promise<Venda> {
    try {
      const venda = this.create(createVendaDto);
      await venda.save();

      return venda;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar a venda no banco de dados.',
      );
    }
  }
}
