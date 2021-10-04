import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum SituacaoProduto {
  ATIVO = 'Ativo',
  INATIVO = 'Inativo',
}

@Entity()
@Unique(['id'])
export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  nome: string;

  @Column({ nullable: true, type: 'varchar', length: 250 })
  descricao: string;

  @Column({ nullable: false, type: 'decimal', precision: 5, scale: 2 })
  valor: number;

  @Column({ nullable: true, type: 'integer' })
  estoque: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: SituacaoProduto,
    default: SituacaoProduto.ATIVO,
  })
  situacao: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
