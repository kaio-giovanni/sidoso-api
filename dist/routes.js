"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PacienteController_1 = __importDefault(require("./controllers/PacienteController"));
const routes = express_1.Router();
const pacienteController = new PacienteController_1.default();
// home page (Does not need authentication)
routes.get('/', (req, res) => {
    return res.json({ title: 'Hello World' });
});
// register a new paciente
routes.post('/register/pacientes', pacienteController.store);
// login paciente
routes.post('/login/pacientes', pacienteController.login);
// home page paciente
routes.get('/pacientes/:id', pacienteController.getById);
exports.default = routes;
//# sourceMappingURL=routes.js.map