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
exports.Paciente = exports.Genre = void 0;
const typeorm_1 = require("typeorm");
var Genre;
(function (Genre) {
    Genre["Masculino"] = "M";
    Genre["Feminino"] = "F";
})(Genre = exports.Genre || (exports.Genre = {}));
let Paciente = class Paciente {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Paciente.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        name: "is_active", type: "bit", default: "1", nullable: false
    }),
    __metadata("design:type", Boolean)
], Paciente.prototype, "is_active", void 0);
__decorate([
    typeorm_1.Column({
        name: "name", type: "varchar", length: 80, nullable: false
    }),
    __metadata("design:type", String)
], Paciente.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        name: "birth", type: "date", nullable: false
    }),
    __metadata("design:type", Date)
], Paciente.prototype, "birth", void 0);
__decorate([
    typeorm_1.Column({
        name: "cpf", type: "varchar", length: 15, nullable: false, unique: true
    }),
    __metadata("design:type", String)
], Paciente.prototype, "cpf", void 0);
__decorate([
    typeorm_1.Column({
        name: "genre", type: "set", enum: Genre, default: [Genre.Masculino, Genre.Feminino], nullable: false
    }),
    __metadata("design:type", String)
], Paciente.prototype, "genre", void 0);
__decorate([
    typeorm_1.Column({
        name: "phone_main", type: "varchar", length: 16, nullable: false, unique: false
    }),
    __metadata("design:type", String)
], Paciente.prototype, "phone_main", void 0);
__decorate([
    typeorm_1.Column({
        name: "phone_secondary", type: "varchar", length: 16, nullable: true, unique: false
    }),
    __metadata("design:type", String)
], Paciente.prototype, "phone_secondary", void 0);
__decorate([
    typeorm_1.Column({
        name: "email", type: "varchar", length: 60, nullable: false, unique: true
    }),
    __metadata("design:type", String)
], Paciente.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        name: "password", type: "varchar", length: 20, nullable: false, unique: false
    }),
    __metadata("design:type", String)
], Paciente.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        name: "create_at", type: "timestamp", nullable: false, unique: false, default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Paciente.prototype, "create_at", void 0);
__decorate([
    typeorm_1.Column({
        name: "update_at", type: "timestamp", nullable: true, unique: false
    }),
    __metadata("design:type", Date)
], Paciente.prototype, "update_at", void 0);
Paciente = __decorate([
    typeorm_1.Entity("pacientes")
], Paciente);
exports.Paciente = Paciente;
//# sourceMappingURL=Paciente.js.map