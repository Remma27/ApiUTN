"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Producto_1 = require("./entity/Producto");
var Usuario_1 = require("./entity/Usuario");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "pruebaUTN",
    synchronize: false,
    logging: false,
    entities: [Producto_1.Producto, Usuario_1.Usuario],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map