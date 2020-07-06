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
routes.post('/register/pacientes/', pacienteController.store);

// login paciente
routes.post('/login/pacientes/', pacienteController.login);

// home page paciente
routes.get('/pacientes/:id/', [authentication], pacienteController.getById);

// edit paciente
routes.patch('/pacientes/:id/edit/', [authentication], pacienteController.update);

/* --------------------PROFISSIONAL ROUTES-------------------- */


/* --------------------ADMIN ROUTES-------------------- */

// register a new admin (Need pre-authentication )
routes.post('/admin/:id/register/', [authentication], adminController.store);

// login admin
routes.post('/login/admin/', adminController.login);

// get all pacientes
routes.get('/admin/:id/pacientes/', [authentication], adminController.getAllPacientes);

// get all profissionais
routes.get('/admin/:id/profissionais/', [authentication], adminController.getAllProfissionais);

// create a new profissional
routes.post('/admin/:id/profissionais/register/', [authentication], adminController.createProfissional);

// get all profissões
routes.get('/admin/:id/profissoes/', [authentication], adminController.getAllProfissoes);

// create a new profissao
routes.post('/admin/:id/profissoes/new/', [authentication], adminController.createProfissao);

export default routes;