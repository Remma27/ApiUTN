"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UsuarioController_1 = require("../controller/UsuarioController");
var routes = (0, express_1.Router)();
routes.get("", UsuarioController_1.default.getAll);
routes.get("/getById/:id", UsuarioController_1.default.getById);
routes.post("", UsuarioController_1.default.add);
routes.patch("", UsuarioController_1.default.update);
routes.delete("/:id", UsuarioController_1.default.delete);
exports.default = routes;
//# sourceMappingURL=usuario.js.map