import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class ProdutoDto {
  @IsNotEmpty({
    message: 'Informe um nome para o produto',
  })
  @MaxLength(50, {
    message: 'O nome do produto deve ter menos de 50 caracteres',
  })
  nome: string;

  @IsOptional()
  @MaxLength(250, {
    message: 'A descrição deve ter menos de 250 caracteres',
  })
  descricao: string;

  @IsNotEmpty({
    message: 'Informe um valor para o produto',
  })
  valor: number;

  estoque: number;

  @IsNotEmpty({
    message: 'Informe a situação do produto',
  })
  situacao: string;
}
