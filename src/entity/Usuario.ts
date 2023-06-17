import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class Usuario {
  @PrimaryColumn()
  @IsNotEmpty({ message: "Falta el ID" })
  id: number;

  @Column()
  @IsNotEmpty({ message: "Falta el Nombre" })
  nombre: string;

  @Column()
  @IsNotEmpty({ message: "Falta el Apellido" })
  apellido1: string;

  @Column()
  @IsNotEmpty({ message: "Falta el Apellido" })
  apellido2: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: "Falta el Correo" })
  correo: string;

  @Column()
  @MaxLength(30)
  @MinLength(5)
  @IsNotEmpty({ message: "Falta la Contrasena" })
  contrasena: string;

  @Column()
  @IsNotEmpty({ message: "Falta el Rol" })
  rol: string;

  @Column()
  fecha_ingreso: Date;

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
