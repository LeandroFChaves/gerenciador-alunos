import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum SituacaoPessoa {
  PENDENTE = 'Pendente',
  ATIVO = 'Ativo',
  INATIVO = 'Inativo',
}

@Entity()
@Unique(['id'])
export class Pessoa extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 250 })
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 11 })
  cpf: string;

  @Column({ nullable: true, type: 'varchar', length: 9 })
  rg: string;

  @Column({ nullable: true, type: 'varchar', length: 8 })
  cep: string;

  @Column({ nullable: false, type: 'varchar', length: 250 })
  endereco: string;

  @Column({ nullable: false, type: 'varchar', length: 10 })
  numero: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  bairro: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  cidade: string;

  @Column({ nullable: true, type: 'varchar', length: 3 })
  estado: string;

  @Column({ nullable: false, type: 'varchar', length: 11 })
  telefone1: string;

  @Column({ nullable: true, type: 'varchar', length: 11 })
  telefone2: string;

  @Column({ nullable: false, type: 'varchar', length: 250 })
  email: string;

  @Column({ nullable: false, type: 'date' })
  dataNascimento: string;

  @Column({ nullable: true, type: 'float' })
  altura: string;

  @Column({ nullable: true, type: 'float' })
  peso: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: SituacaoPessoa,
    default: SituacaoPessoa.PENDENTE,
  })
  situacao: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
