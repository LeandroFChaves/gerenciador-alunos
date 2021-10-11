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

import { VendaDto } from './dtos/venda.dto';
import { Venda } from './venda.entity';
import { VendasService } from './vendas.service';

@Controller('vendas')
export class VendasController {
  constructor(private vendasService: VendasService) {}

  @Get()
  async listVendas() {
    return await this.vendasService.listVendas();
  }

  @Get(':id')
  async findVendaById(@Param('id') id): Promise<Venda> {
    return await this.vendasService.findVendaById(id);
  }

  @Post()
  async createVenda(
    @Body(ValidationPipe) createVendaDto: VendaDto,
  ): Promise<Venda> {
    const venda = await this.vendasService.createVenda(createVendaDto);
    return venda;
  }

  @Put(':id')
  async updateVenda(
    @Body(ValidationPipe) updateVendaDto: VendaDto,
    @Param('id') id: number,
  ) {
    return this.vendasService.updateVenda(updateVendaDto, id);
  }

  @Delete(':id')
  async deleteVenda(@Param('id') id: number) {
    await this.vendasService.deleteVenda(id);
    return {
      message: 'Venda removida com sucesso.',
    };
  }
}
