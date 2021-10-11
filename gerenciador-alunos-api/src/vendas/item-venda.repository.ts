import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { ItemVenda } from './item-venda.entity';
import { ItemVendaDto } from './dtos/item-venda.dto';

@EntityRepository(ItemVenda)
export class ItemVendaRepository extends Repository<ItemVenda> {
  async createItemVenda(itemVendaDto: ItemVendaDto): Promise<ItemVenda> {
    try {
      const itemVenda = this.create(itemVendaDto);

      await itemVenda.save();

      return itemVenda;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o item da venda no banco de dados.',
      );
    }
  }
}
