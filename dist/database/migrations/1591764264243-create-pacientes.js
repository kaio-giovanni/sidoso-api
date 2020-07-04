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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPacientes1591764264243 = void 0;
var createPacientes1591764264243 = /** @class */ (function () {
    function createPacientes1591764264243() {
        this.name = 'createPacientes1591764264243';
    }
    createPacientes1591764264243.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE `pacientes`" +
                            " (`id` int NOT NULL AUTO_INCREMENT," +
                            " `is_active` tinyint NOT NULL DEFAULT '1'," +
                            " `name` varchar(80) NOT NULL," +
                            " `birth` date NOT NULL," +
                            " `cpf` varchar(15) NOT NULL," +
                            " `genre` set ('M', 'F') NOT NULL DEFAULT 'M,F'," +
                            " `phone_main` varchar(16) NOT NULL," +
                            " `phone_secondary` varchar(16) NULL," +
                            " `email` varchar(60) NOT NULL," +
                            " `password` varchar(80) NOT NULL," +
                            " `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)," +
                            " `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)," +
                            " UNIQUE INDEX `IDX_d6737b831d4e311678dfce056b` (`cpf`)," +
                            " UNIQUE INDEX `IDX_9b1d1c80bdf7c29c7187ef8939` (`email`)," +
                            " PRIMARY KEY (`id`)) ENGINE=InnoDB")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    createPacientes1591764264243.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("DROP INDEX `IDX_9b1d1c80bdf7c29c7187ef8939` ON `pacientes`")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX `IDX_d6737b831d4e311678dfce056b` ON `pacientes`")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `pacientes`")];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return createPacientes1591764264243;
}());
exports.createPacientes1591764264243 = createPacientes1591764264243;
//# sourceMappingURL=1591764264243-create-pacientes.js.map