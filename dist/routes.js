"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("./middlewares/auth"));
var AdminController_1 = __importDefault(require("./controllers/AdminController"));
var PacienteController_1 = __importDefault(require("./controllers/PacienteController"));
var routes = express_1.Router();
var adminController = new AdminController_1.default();
var pacienteController = new PacienteController_1.default();
// home page (Does not need authentication)
routes.get('/', function (req, res) {
    return res.status(200).send({ page: "home page sidoso" });
});
/* --------------------PACIENTE ROUTES-------------------- */
// register a new paciente
routes.post('/register/pacientes', pacienteController.store);
// login paciente
routes.post('/login/pacientes', pacienteController.login);
// home page paciente
routes.get('/pacientes/:id', [auth_1.default], pacienteController.getById);
// edit paciente
routes.patch('/pacientes/:id/edit', [auth_1.default], pacienteController.update);
/* --------------------PROFISSIONAL ROUTES-------------------- */
/* --------------------ADMIN ROUTES-------------------- */
// register a new admin (Need pre-authentication )
routes.post('/admin/:id/register', [auth_1.default], adminController.store);
// login admin
routes.post('/login/admin', adminController.login);
// get all pacientes
routes.get('/admin/:id/pacientes', [auth_1.default], adminController.getAllPacientes);
exports.default = routes;
//# sourceMappingURL=routes.js.map