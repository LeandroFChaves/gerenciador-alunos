export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  estoque: number;
  situacao: string;
}

export interface ProdutoInput {
  nome: string;
  descricao: string;
  valor: number;
  estoque: number;
  situacao: string;
}
