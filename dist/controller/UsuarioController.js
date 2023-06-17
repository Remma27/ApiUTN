"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_source_1 = require("../data-source");
var Usuario_1 = require("../entity/Usuario");
var class_validator_1 = require("class-validator");
var UsuarioController = /** @class */ (function () {
    function UsuarioController() {
    }
    var _a;
    _a = UsuarioController;
    UsuarioController.getAll = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
        var UsuarioRepo, listaUsuarios, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    UsuarioRepo = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
                    return [4 /*yield*/, UsuarioRepo.find({
                            where: { estado: true },
                        })];
                case 1:
                    listaUsuarios = _b.sent();
                    if (listaUsuarios.length === 0) {
                        return [2 /*return*/, resp
                                .status(404)
                                .json({ mensaje: "No se encontraron resultados." })];
                    }
                    return [2 /*return*/, resp.status(200).json({ listaUsuarios: listaUsuarios })];
                case 2:
                    error_1 = _b.sent();
                    return [2 /*return*/, resp.status(400).json({ mensaje: error_1.message })];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UsuarioController.getById = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
        var UsuarioRepo, id, usuario, error_2, error_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    UsuarioRepo = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
                    id = parseInt(req.params["id"]);
                    if (!id) {
                        id;
                        return [2 /*return*/, resp.status(404).json({ mensaje: "No se indica el ID" })];
                    }
                    usuario = void 0;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, UsuarioRepo.findOneOrFail({
                            where: { id: id, estado: true },
                        })];
                case 2:
                    usuario = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    return [2 /*return*/, resp
                            .status(404)
                            .json({ mensaje: "No se encontro el usuario con ese ID" })];
                case 4: return [2 /*return*/, resp.status(200).json({ usuario: usuario })];
                case 5:
                    error_3 = _b.sent();
                    return [2 /*return*/, resp.status(400).json({ mensaje: error_3 })];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    UsuarioController.add = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, id, nombre, apellido1, apellido2, correo, contrasena, rol, fecha, usuario, errors, UsuarioRepo, usuarioExist, error_4, error_5;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 8, , 9]);
                    _b = req.body, id = _b.id, nombre = _b.nombre, apellido1 = _b.apellido1, apellido2 = _b.apellido2, correo = _b.correo, contrasena = _b.contrasena, rol = _b.rol;
                    fecha = new Date();
                    usuario = new Usuario_1.Usuario();
                    usuario.id = id;
                    usuario.nombre = nombre;
                    usuario.apellido1 = apellido1;
                    usuario.apellido2 = apellido2;
                    usuario.fecha_ingreso = fecha;
                    usuario.correo = correo;
                    usuario.contrasena = contrasena;
                    usuario.rol = rol;
                    usuario.estado = true;
                    return [4 /*yield*/, (0, class_validator_1.validate)(Usuario_1.Usuario, {
                            validationError: { target: false, value: false },
                        })];
                case 1:
                    errors = _c.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, resp.status(400).json(errors)];
                    }
                    UsuarioRepo = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
                    return [4 /*yield*/, UsuarioRepo.findOne({ where: { id: id } })];
                case 2:
                    usuarioExist = _c.sent();
                    if (usuarioExist) {
                        return [2 /*return*/, resp
                                .status(400)
                                .json({ mensaje: "El usuario ya existe en la base de datos." })];
                    }
                    return [4 /*yield*/, UsuarioRepo.findOne({ where: { correo: correo } })];
                case 3:
                    usuarioExist = _c.sent();
                    if (usuarioExist) {
                        resp
                            .status(400)
                            .json({ mensaje: "Ya existe un usuario registrado con el correo" });
                    }
                    usuario.hashPassword();
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, UsuarioRepo.save(usuario)];
                case 5:
                    _c.sent();
                    return [2 /*return*/, resp.status(201).json({ mensaje: "Se ha creado el usuario" })];
                case 6:
                    error_4 = _c.sent();
                    resp.status(400).json(error_4);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_5 = _c.sent();
                    return [2 /*return*/, resp.status(400).json({ mensaje: error_5 })];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    UsuarioController.update = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, id, nombre, apellido1, apellido2, correo, contrasena, rol, UsuarioRepo, usu, errors, error_6;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, id = _b.id, nombre = _b.nombre, apellido1 = _b.apellido1, apellido2 = _b.apellido2, correo = _b.correo, contrasena = _b.contrasena, rol = _b.rol;
                    UsuarioRepo = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
                    return [4 /*yield*/, UsuarioRepo.findOne({ where: { id: id } })];
                case 1:
                    usu = _c.sent();
                    if (usu) {
                        return [2 /*return*/, resp
                                .status(404)
                                .json({ mensaje: "El usuario ya existe en la base de datos." })];
                    }
                    usu.nombre = nombre;
                    usu.apellido1 = apellido1;
                    usu.apellido2 = apellido2;
                    usu.correo = correo;
                    usu.contrasena = contrasena;
                    usu.rol = rol;
                    usu.estado = true;
                    return [4 /*yield*/, (0, class_validator_1.validate)(usu, {
                            validationError: { target: false, value: false },
                        })];
                case 2:
                    errors = _c.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, resp.status(400).json(errors)];
                    }
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, UsuarioRepo.save(usu)];
                case 4:
                    _c.sent();
                    return [2 /*return*/, resp.status(200).json({ mensaje: "Se guardo correctamente" })];
                case 5:
                    error_6 = _c.sent();
                    return [2 /*return*/, resp.status(400).json({ mensaje: "No existe el usuario" })];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    UsuarioController.delete = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
        var id, UsuarioRepo, usu, error_7, error_8, error_9;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    id = parseInt(req.params["id"]);
                    if (!id) {
                        return [2 /*return*/, resp.status(404).json({ mensaje: "Debe indicar el Id" })];
                    }
                    UsuarioRepo = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
                    usu = void 0;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, UsuarioRepo.findOneOrFail({
                            where: { id: id, estado: true },
                        })];
                case 2:
                    usu = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _b.sent();
                    return [2 /*return*/, resp.status(400).json({ mensaje: "No se encontro el usuario" })];
                case 4:
                    //como el estado es true siempre que haya producto
                    //al ponerle false se borra automaticamente
                    usu.estado = false;
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, UsuarioRepo.save(usu)];
                case 6:
                    _b.sent();
                    return [2 /*return*/, resp
                            .status(200)
                            .json({ mensaje: "Usuario eliminado correctamente" })];
                case 7:
                    error_8 = _b.sent();
                    return [2 /*return*/, resp.status(404).json({ mensaje: "No se pudo eliminar" })];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_9 = _b.sent();
                    return [2 /*return*/, resp.status(400).json({ mensaje: "No se pudo eliminar" })];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    return UsuarioController;
}());
exports.default = UsuarioController;
//# sourceMappingURL=UsuarioController.js.map