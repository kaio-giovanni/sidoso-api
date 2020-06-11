import { Router } from 'express';
import authentication from './middlewares/auth';
import AdminController from './controllers/AdminController';
import PacienteController from './controllers/PacienteController';

const routes = Router();
const adminController = new AdminController();
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

// edit paciente
routes.patch('/pacientes/:id/edit', [authentication], pacienteController.update);

/* --------------------PROFISSIONAL ROUTES-------------------- */


/* --------------------ADMIN ROUTES-------------------- */

// register a new admin (Need pre-authentication )
routes.post('/admin/:id/register', [authentication], adminController.store);

export default routes;