import { Pessoa } from './../../pessoas/pessoa.entity';
import { ItemVendaDto } from './item-venda.dto';

export class VendaDto {
  pessoaCliente: Pessoa;

  pessoaVendedor: Pessoa;

  dataVenda: Date;

  desconto: number;

  valorBruto: number;

  valorLiquido: number;

  itensVenda: ItemVendaDto[];

  observacao: string;
}
