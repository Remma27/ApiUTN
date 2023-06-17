import { MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class Usuario {
  @PrimaryColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  apellido1: string;
  @Column()
  apellido2: string;
  @Column({ unique: true })
  correo: string;

  @Column()
  @MaxLength(30)
  @MinLength(5)
  contrasena: string;

  @Column()
  rol: string;

  @Column({ default: true })
  estado: boolean;

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.contrasena = bcrypt.hashSync(this.contrasena, salt);
  }

  checkPassword(contra: string): boolean {
    return bcrypt.compareSync(contra, this.contrasena);
  }
}
