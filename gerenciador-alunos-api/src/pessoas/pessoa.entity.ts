import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class Pessoa extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 300 })
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  situacao: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
