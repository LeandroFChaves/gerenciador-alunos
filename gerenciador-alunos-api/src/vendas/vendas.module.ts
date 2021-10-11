import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import { VendaRepository } from './venda.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VendaRepository])],
  providers: [VendasService],
  controllers: [VendasController],
})
export class VendasModule {}
