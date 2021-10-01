import { IsNotEmpty, MaxLength } from 'class-validator';

export class AlunoDto {
  @IsNotEmpty({
    message: 'Informe um nome para o aluno',
  })
  @MaxLength(300, {
    message: 'O nome do aluno deve ter menos de 300 caracteres',
  })
  nome: string;

  @IsNotEmpty({
    message: 'Informe a situação do aluno',
  })
  @MaxLength(50, {
    message: 'A situação deve ter menos de 50 caracteres',
  })
  situacao: string;
}
