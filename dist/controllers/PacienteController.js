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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Paciente_1 = require("../models/Paciente");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
class PacienteController {
    // select * from pacientes where pacientes.is_active = '1'
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.send({ name: "index", success: true });
        });
    }
    // get paciente by id
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json({ name: "getById", success: true });
        });
    }
    // login paciente
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!(email && password)) {
                return res.status(400).send({ error: "email and password field are required" });
            }
            const pacienteRepository = typeorm_1.getRepository(Paciente_1.Paciente);
            // get user from database
            let paciente;
            try {
                paciente = yield pacienteRepository.findOneOrFail({ where: { email } });
            }
            catch (error) {
                return res.status(401).send({ error: "User (paciente) not found" });
            }
            if (!paciente.checkPassword(password)) {
                return res.status(401).send({ error: "Password is incorrect" });
            }
            // generate token 
            const token = jsonwebtoken_1.default.sign({ pacienteId: paciente.id, email: paciente.email }, auth_1.default.secret_key + "", {
                expiresIn: auth_1.default.expiresIn
            });
            res.setHeader("authorization", token);
            return res.status(200).send(paciente);
        });
    }
    // create a new paciente
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    // update a paciente
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    // set paciente.is_active to false
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = PacienteController;
//# sourceMappingURL=PacienteController.js.map