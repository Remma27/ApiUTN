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
exports.Producto = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Producto = exports.Producto = /** @class */ (function () {
    function Producto() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", Number)
    ], Producto.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 50 }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], Producto.prototype, "nombre", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)({ message: "" }),
        __metadata("design:type", Number)
    ], Producto.prototype, "precio", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], Producto.prototype, "stock", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Producto.prototype, "fechaIngreso", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Producto.prototype, "estado", void 0);
    Producto = __decorate([
        (0, typeorm_1.Entity)()
    ], Producto);
    return Producto;
}());
//# sourceMappingURL=Producto.js.map