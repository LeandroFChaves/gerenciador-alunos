import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { VendaDto } from './dtos/venda.dto';
import { Venda } from './venda.entity';
import { VendaRepository } from './venda.repository';

@Injectable()
export class VendasService {
  constructor(
    @InjectRepository(VendaRepository)
    private vendaRepository: VendaRepository,
  ) {}

  async listVendas(): Promise<{ vendas: Venda[]; total: number }> {
    const vendas = await this.vendaRepository.listVendas();
    return vendas;
  }

  async findVendaById(vendaId: number): Promise<Venda> {
    const venda = await this.vendaRepository.findOne({
      join: {
        alias: 'venda',
        leftJoinAndSelect: {
          itensVenda: 'venda.itensVenda',
          cliente: 'venda.pessoaCliente',
          vendedor: 'venda.pessoaVendedor',
        },
      },
      where: {
        id: vendaId,
      },
    });

    if (!venda) throw new NotFoundException('Venda não encontrada!');

    return venda;
  }

  async createVenda(createVendaDto: VendaDto): Promise<Venda> {
    console.log('opaa 111 ');
    console.log(createVendaDto);

    return this.vendaRepository.createVenda(createVendaDto);
  }

  async updateVenda(updateVendaDto: VendaDto, id: number) {
    console.log('opaa 222 ' + id);
    console.log(updateVendaDto);

    const result = await this.vendaRepository
      .createQueryBuilder('venda')
      .update(Venda, updateVendaDto)
      .where('venda.id = :id', { id })
      .returning('*')
      .updateEntity(true)
      .execute();

    // const result = await this.vendaRepository.update({ id }, updateVendaDto);

    if (result) {
      return result.raw[0];
    } else {
      throw new NotFoundException('Venda não encontrado!');
    }
  }

  async deleteVenda(vendaId: number) {
    const result = await this.vendaRepository.delete({ id: vendaId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado uma venda com o ID informado.',
      );
    }
  }
}
