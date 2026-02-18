import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { User } from "../../users/user.entity";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @Column()
  type: "ingreso" | "gasto"; // Para saber si suma o resta a la billetera

  @Column({ type: "date" })
  date: string; // Fecha en la que se hizo el gasto

  @Column({ nullable: true })
  note: string; // Algún detalle extra opcional

  // Muchas transacciones pertenecen a una categoría (Ej: LUZ)
  @ManyToOne(() => Category, (category) => category.transactions)
  category: Category;

  // Muchas transacciones pertenecen a un usuario (¡Seguridad!)
  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date; // Cuándo se registró en el sistema
}
