import { Produto } from './../../produtos/model/produto';
import { Pessoa } from './../../pessoas/model/pessoa';

export interface Venda {
  id: number;
  pessoaCliente: Pessoa;
  pessoaVendedor: Pessoa;
  dataVenda: Date;
  itensVenda: ItemVenda[];
  valorLiquido: number;
  valorBruto: number;
  observacao: string;
}

export interface ItemVenda {
  id: number;
  produto: Produto;
  quantidade: number;
  desconto: number;
  valor: number;
}

export interface VendaInput {
  pessoaCliente: Pessoa;
  pessoaVendedor: Pessoa;
  dataVenda: Date;
  itensVenda: ItemVenda[];
  desconto: number;
  valorBruto: number;
  valorLiquido: number;
  observacao: string;
}
