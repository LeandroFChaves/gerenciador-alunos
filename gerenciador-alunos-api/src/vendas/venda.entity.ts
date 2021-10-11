import { Pessoa } from 'src/pessoas/pessoa.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ItemVenda } from './item-venda.entity';

export enum FormaPagamento {
  DINHEIRO = 'Dinheiro',
  PIX = 'PIX',
  DEBITO = 'Débito',
  CREDITO = 'Crédito',
  TRANSFERENCIA = 'Transferência',
}

@Entity()
@Unique(['id'])
export class Venda extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Pessoa)
  @JoinColumn({ name: 'fk_pessoa_cliente' })
  pessoaCliente: Pessoa;

  @ManyToOne(() => Pessoa)
  @JoinColumn({ name: 'fk_pessoa_vendedor' })
  pessoaVendedor: Pessoa;

  @Column({ nullable: false, type: 'date' })
  dataVenda: Date;

  @Column({ nullable: true, type: 'decimal', precision: 5, scale: 2 })
  desconto: number;

  @Column({ nullable: false, type: 'decimal', precision: 5, scale: 2 })
  valorBruto: number;

  @Column({ nullable: false, type: 'decimal', precision: 5, scale: 2 })
  valorLiquido: number;

  @OneToMany(() => ItemVenda, (itensVenda) => itensVenda.venda, {
    cascade: true,
    eager: true,
  })
  itensVenda: ItemVenda[];

  @Column({
    nullable: false,
    type: 'enum',
    enum: FormaPagamento,
  })
  formaPagamento: string;

  @Column({ nullable: true, type: 'varchar', length: 250 })
  observacao: string;
}
