import { IsNotEmpty, MaxLength, maxLength } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Producto {
  @PrimaryColumn()
  id: number;
  @Column({ length: 50 })
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
