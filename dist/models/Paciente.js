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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = exports.Genre = void 0;
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
var Genre;
(function (Genre) {
    Genre["Masculino"] = "M";
    Genre["Feminino"] = "F";
})(Genre = exports.Genre || (exports.Genre = {}));
let Paciente = class Paciente {
    hashPassword() {
        this.password = bcryptjs_1.default.hashSync(this.password, 8);
    }
    checkPassword(noCryptpassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(noCryptpassword, this.password);
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Paciente.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        name: "is_active", type: "boolean", default: "1", nullable: false
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
        name: "password", type: "varchar", length: 80, nullable: false, unique: false
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
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Paciente.prototype, "hashPassword", null);
Paciente = __decorate([
    typeorm_1.Entity("pacientes")
], Paciente);
exports.Paciente = Paciente;
//# sourceMappingURL=Paciente.js.map