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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Paciente_1 = require("../models/Paciente");
var TokenJwt_1 = require("../authentication/TokenJwt");
var connection_1 = __importDefault(require("../database/connection"));
var PacienteController = /** @class */ (function () {
    function PacienteController() {
    }
    // get paciente by id
    PacienteController.prototype.getById = function (req, res) {
        var _this = this;
        connection_1.default.then(function (conn) { return __awaiter(_this, void 0, void 0, function () {
            var vrfyRole, userId, pacienteRepository, paciente, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vrfyRole = TokenJwt_1.TokenJwt.verifyRole(req.headers.authorization, TokenJwt_1.TokenJwt.role.PACIENTE);
                        if (!vrfyRole.success)
                            return [2 /*return*/, res.status(403).send(vrfyRole.body)];
                        // set authorization header
                        res.setHeader("authorization", vrfyRole.body.userToken);
                        userId = req.params.id;
                        pacienteRepository = conn.getRepository(Paciente_1.Paciente);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, pacienteRepository.findOneOrFail({ where: { id: userId } })];
                    case 2:
                        paciente = _a.sent();
                        return [2 /*return*/, res.status(200).send(paciente)];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(401).send({
                                error: "User not found",
                                message: error_1
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    };
    // login paciente
    PacienteController.prototype.login = function (req, res) {
        var _this = this;
        connection_1.default.then(function (conn) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, pacienteRepository, paciente, error_2, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        if (!(email && password)) {
                            return [2 /*return*/, res.status(400).send({
                                    error: "User not found",
                                    message: "Email and password field are required"
                                })];
                        }
                        pacienteRepository = conn.getRepository(Paciente_1.Paciente);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, pacienteRepository.findOneOrFail({ where: { email: email } })];
                    case 2:
                        paciente = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        return [2 /*return*/, res.status(401).send({
                                error: "User not found",
                                message: "Please, make sure you entered you email correctly"
                            })];
                    case 4: return [4 /*yield*/, paciente.checkPassword(password)];
                    case 5:
                        if (!(_b.sent())) {
                            return [2 /*return*/, res.status(401).send({
                                    error: "Password is incorrect",
                                    message: "Please, make sure you entered your password correctly"
                                })];
                        }
                        token = TokenJwt_1.TokenJwt.generateToken(paciente.id, paciente.email, TokenJwt_1.TokenJwt.role.PACIENTE);
                        res.setHeader("authorization", token);
                        return [2 /*return*/, res.status(200).send(paciente)];
                }
            });
        }); }).catch(function (error) {
            return res.status(406).send({ error: "An error has occurred", mesage: error });
        });
    };
    // create a new paciente
    PacienteController.prototype.store = function (req, res) {
        var _this = this;
        connection_1.default.then(function (conn) { return __awaiter(_this, void 0, void 0, function () {
            var data, pacienteRepository, paciente, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = req.body;
                        pacienteRepository = conn.getRepository(Paciente_1.Paciente);
                        paciente = pacienteRepository.create();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        paciente.name = data.name;
                        paciente.birth = data.birth;
                        paciente.cpf = data.cpf;
                        paciente.genre = data.genre;
                        paciente.phone_main = data.phone_main;
                        paciente.phone_secondary = data.phone_secondary;
                        paciente.email = data.email;
                        paciente.password = data.password;
                        return [4 /*yield*/, pacienteRepository.save(paciente)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(201).send({ success: true })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(400).send({ error: "Registration failure", message: error_3 })];
                    case 4: return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    };
    // update a paciente
    PacienteController.prototype.update = function (req, res) {
        var _this = this;
        connection_1.default.then(function (conn) { return __awaiter(_this, void 0, void 0, function () {
            var vrfyRole, userId, _a, phone_main, phone_secondary, pacienteRepository, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vrfyRole = TokenJwt_1.TokenJwt.verifyRole(req.headers.authorization, TokenJwt_1.TokenJwt.role.PACIENTE);
                        if (!vrfyRole.success)
                            return [2 /*return*/, res.status(403).send(vrfyRole.body)];
                        // set authorization header
                        res.setHeader("authorization", vrfyRole.body.userToken);
                        userId = req.params.id;
                        _a = req.body, phone_main = _a.phone_main, phone_secondary = _a.phone_secondary;
                        pacienteRepository = conn.getRepository(Paciente_1.Paciente);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, pacienteRepository.update(userId, {
                                phone_main: phone_main, phone_secondary: phone_secondary
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(200).send({ success: true })];
                    case 3:
                        error_4 = _b.sent();
                        return [2 /*return*/, res.status(400).send({ error: "Editing failure", message: error_4 })];
                    case 4: return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    };
    // set paciente.is_active to false
    PacienteController.prototype.destroy = function (req, res) {
        var _this = this;
        connection_1.default.then(function (conn) { return __awaiter(_this, void 0, void 0, function () {
            var vrfyRole, userId, pacienteRepository, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vrfyRole = TokenJwt_1.TokenJwt.verifyRole(req.headers.authorization, TokenJwt_1.TokenJwt.role.PACIENTE);
                        if (!vrfyRole.success)
                            return [2 /*return*/, res.status(403).send(vrfyRole.body)];
                        userId = req.params.id;
                        pacienteRepository = conn.getRepository(Paciente_1.Paciente);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, pacienteRepository.update(userId, {
                                is_active: false
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send({ success: true })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(400).send({ error: "Editing failure", message: error_5 })];
                    case 4: return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    };
    return PacienteController;
}());
exports.default = PacienteController;
//# sourceMappingURL=PacienteController.js.map