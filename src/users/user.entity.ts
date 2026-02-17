import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string; // Aquí guardaremos el email de Google

  @Column({ nullable: true }) // 👈 CAMBIO: Ahora puede ser null para usuarios de Google
  password: string;

  @Column({ nullable: true }) // Opcional: Para saber si vino de google
  googleId: string;
}
