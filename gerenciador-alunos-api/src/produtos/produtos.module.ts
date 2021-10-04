import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProdutoRepository } from './produto.repository';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoRepository])],
  providers: [ProdutosService],
  controllers: [ProdutosController],
})
export class ProdutosModule {}
