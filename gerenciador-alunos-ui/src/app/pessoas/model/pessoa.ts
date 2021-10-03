export interface Pessoa {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  telefone1: string;
  telefone2: string;
  email: string;
  dataNascimento: Date;
  altura: string;
  peso: string;
  situacao: string;
}

export interface PessoaInput {
  nome: string;
  cpf: string;
  rg: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  telefone1: string;
  telefone2: string;
  email: string;
  dataNascimento: Date;
  altura: string;
  peso: string;
  situacao: string;
}
