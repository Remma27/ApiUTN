"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var bcrypt = require("bcryptjs");
var Usuario = exports.Usuario = /** @class */ (function () {
    function Usuario() {
    }
    Usuario.prototype.hashPassword = function () {
        var salt = bcrypt.genSaltSync(10);
        this.contrasena = bcrypt.hashSync(this.contrasena, salt);
    };
    Usuario.prototype.checkPassword = function (contra) {
        return bcrypt.compareSync(contra, this.contrasena);
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        (0, class_validator_1.IsNotEmpty)({ message: "Falta el ID" }),
        __metadata("design:type", Number)
    ], Usuario.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)({ message: "Falta el Nombre" }),
        __metadata("design:type", String)
    ], Usuario.prototype, "nombre", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)({ message: "Falta el Apellido" }),
        __metadata("design:type", String)
    ], Usuario.prototype, "apellido1", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)({ message: "Falta el Apellido" }),
        __metadata("design:type", String)
    ], Usuario.prototype, "apellido2", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        (0, class_validator_1.IsNotEmpty)({ message: "Falta el Correo" }),
        __metadata("design:type", String)
    ], Usuario.prototype, "correo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.MaxLength)(30),
        (0, class_validator_1.MinLength)(5),
        (0, class_validator_1.IsNotEmpty)({ message: "Falta la Contrasena" }),
        __metadata("design:type", String)
    ], Usuario.prototype, "contrasena", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)({ message: "Falta el Rol" }),
        __metadata("design:type", String)
    ], Usuario.prototype, "rol", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Usuario.prototype, "fecha_ingreso", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: true }),
        __metadata("design:type", Boolean)
    ], Usuario.prototype, "estado", void 0);
    Usuario = __decorate([
        (0, typeorm_1.Entity)()
    ], Usuario);
    return Usuario;
}());
//# sourceMappingURL=Usuario.js.map