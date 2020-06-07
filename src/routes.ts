import { Router } from 'express';
import PacienteController from './controllers/PacienteController';

const routes = Router();
const pacienteController = new PacienteController();

// home page (Does not need authentication)
routes.get('/', (req, res) => {
    return res.json({ title: 'Hello World' });
});

// register a new paciente
routes.post('/register/pacientes', pacienteController.store);

// login paciente
routes.post('/login/pacientes', pacienteController.login);

// home page paciente
routes.get('/pacientes/:id', pacienteController.getById)

export default routes;