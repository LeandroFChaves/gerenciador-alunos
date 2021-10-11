import { VendaDto } from './venda.dto';
import { ProdutoDto } from '../../produtos/dtos/produto.dto';

export class ItemVendaDto {
  venda: VendaDto;

  produto: ProdutoDto;

  quantidade: number;

  valor: number;

  desconto: number;
}
