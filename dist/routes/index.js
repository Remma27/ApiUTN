"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var productos_1 = require("./productos");
var usuario_1 = require("./usuario");
var routes = (0, express_1.Router)();
routes.use("/Productos", productos_1.default);
routes.use("/Usuarios", usuario_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map