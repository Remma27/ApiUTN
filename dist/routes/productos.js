"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProductosController_1 = require("../controller/ProductosController");
var routes = (0, express_1.Router)();
routes.get('', ProductosController_1.default.getAll);
routes.get('/getById/:id', ProductosController_1.default.getById);
routes.post('', ProductosController_1.default.add);
routes.patch('', ProductosController_1.default.update);
routes.delete('/:id', ProductosController_1.default.delete);
exports.default = routes;
//# sourceMappingURL=productos.js.map