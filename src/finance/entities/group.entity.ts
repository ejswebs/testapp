import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Un grupo tiene muchas categorías
  @OneToMany(() => Category, (category) => category.group)
  categories: Category[];
}