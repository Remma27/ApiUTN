import { IsNotEmpty, MaxLength, maxLength } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Producto {
  @PrimaryColumn()
  id: number;
  @Column({ length: 50 })
  @MaxLength(5, { message: "Debe ser menos de 5 caracteres" })
  @IsNotEmpty()
  nombre: string;
  @Column()
  @IsNotEmpty({ message: "" })
  precio: number;
  @Column()
  @IsNotEmpty()
  stock: number;
  @Column()
  fechaIngreso: Date;
  @Column()
  estado: boolean;
}
