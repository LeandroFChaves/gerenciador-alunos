import { Produto } from 'src/produtos/produto.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Venda } from './venda.entity';

@Entity()
@Unique(['id'])
export class ItemVenda extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Venda, (venda) => venda.itensVenda, {
    primary: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  venda: Venda;

  @ManyToOne(() => Produto, {
    primary: true,
    eager: true,
  })
  produto: Produto;

  @Column({ nullable: false, type: 'integer' })
  quantidade: number;

  @Column({ nullable: false, type: 'decimal', precision: 5, scale: 2 })
  valor: number;

  @Column({ nullable: true, type: 'decimal', precision: 5, scale: 2 })
  desconto: number;
}
