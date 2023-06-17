import "reflect-metadata";
import { DataSource } from "typeorm";
import { Producto } from "./entity/Producto";
import { Usuario } from "./entity/Usuario";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "pruebaUTN",
  synchronize: true,
  logging: false,
  entities: [Producto, Usuario],
  migrations: [],
  subscribers: [],
});
