import { Router } from 'express';
import authentication from './middlewares/auth';
import PacienteController from './controllers/PacienteController';

const routes = Router();
const pacienteController = new PacienteController();

// home page (Does not need authentication)
routes.get('/', pacienteController.index);

// register a new paciente
routes.post('/register/pacientes', pacienteController.store);

// login paciente
routes.post('/login/pacientes', pacienteController.login);

// home page paciente
routes.get('/pacientes/:id', [authentication], pacienteController.getById);

export default routes;