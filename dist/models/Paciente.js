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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = exports.Genre = void 0;
var typeorm_1 = require("typeorm");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var Genre;
(function (Genre) {
    Genre["Masculino"] = "M";
    Genre["Feminino"] = "F";
})(Genre = exports.Genre || (exports.Genre = {}));
var Paciente = /** @class */ (function () {
    function Paciente() {
    }
    Paciente.prototype.hashPassword = function () {
        this.password = bcryptjs_1.default.hashSync(this.password, 8);
    };
    Paciente.prototype.checkPassword = function (noCryptpassword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcryptjs_1.default.compare(noCryptpassword, this.password)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
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
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Paciente.prototype, "create_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
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
    return Paciente;
}());
exports.Paciente = Paciente;
//# sourceMappingURL=Paciente.js.map