import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Group } from './group.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Muchas categorías pertenecen a un grupo
  @ManyToOne(() => Group, (group) => group.categories)
  group: Group;

  // Una categoría puede tener muchas transacciones (gastos)
  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];
}