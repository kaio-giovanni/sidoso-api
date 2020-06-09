import { Router } from 'express';
import authentication from './middlewares/auth';
import PacienteController from './controllers/PacienteController';

const routes = Router();
const pacienteController = new PacienteController();

// home page (Does not need authentication)
routes.get('/', (req, res) => {
    return res.status(200).send({ page: "home page sidoso"});
});

/* --------------------PACIENTE ROUTES-------------------- */

// register a new paciente
routes.post('/register/pacientes', pacienteController.store);

// login paciente
routes.post('/login/pacientes', pacienteController.login);

// home page paciente
routes.get('/pacientes/:id', [authentication], pacienteController.getById);

/* --------------------PROFISSIONAL ROUTES-------------------- */

export default routes;