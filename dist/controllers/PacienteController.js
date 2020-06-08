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
const Paciente_1 = require("../models/Paciente");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
const connection_1 = __importDefault(require("../database/connection"));
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
            connection_1.default.then((conn) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const pacienteRepository = conn.getRepository(Paciente_1.Paciente);
                let paciente;
                try {
                    paciente = yield pacienteRepository.findOneOrFail({ where: { id } });
                }
                catch (error) {
                    return res.status(401).send({ error: "User (paciente) not found" });
                }
                return res.status(200).send(paciente);
            })).catch((error) => {
                return res.status(406).send({ error });
            });
        });
    }
    // login paciente
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            connection_1.default.then((conn) => __awaiter(this, void 0, void 0, function* () {
                const { email, password } = req.body;
                if (!(email && password)) {
                    return res.status(400).send({ error: "email and password field are required" });
                }
                const pacienteRepository = conn.getRepository(Paciente_1.Paciente);
                // get user from database
                let paciente;
                try {
                    paciente = yield pacienteRepository.findOneOrFail({ where: { email } });
                }
                catch (error) {
                    return res.status(401).send({ error: "User (paciente) not found" });
                }
                if (!(yield paciente.checkPassword(password))) {
                    return res.status(401).send({ error: "Password is incorrect" });
                }
                // generate token 
                const token = jsonwebtoken_1.default.sign({ id: paciente.id, email: paciente.email }, "" + auth_1.default.secret_key, {
                    expiresIn: auth_1.default.expiresIn
                });
                res.setHeader("authorization", "sidoso " + token);
                return res.status(200).send(paciente);
            })).catch(error => {
                return res.status(406).send({ error });
            });
        });
    }
    // create a new paciente
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            connection_1.default.then((conn) => __awaiter(this, void 0, void 0, function* () {
                const data = req.body;
                const pacienteRepository = conn.getRepository(Paciente_1.Paciente);
                const paciente = pacienteRepository.create();
                try {
                    paciente.name = data.name;
                    paciente.birth = data.birth;
                    paciente.cpf = data.cpf;
                    paciente.genre = data.genre;
                    paciente.phone_main = data.phone_main;
                    paciente.phone_secondary = data.phone_secondary;
                    paciente.email = data.email;
                    paciente.password = data.password;
                    yield pacienteRepository.save(paciente);
                    return res.status(201).send({ success: true });
                }
                catch (error) {
                    return res.status(400).send(error);
                }
            })).catch(error => {
                return res.status(406).send({ error });
            });
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