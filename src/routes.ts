import { Router } from 'express';
import authentication from './middlewares/auth';
import AdminController from './controllers/AdminController';
import PacienteController from './controllers/PacienteController';
import ProfissionalController from './controllers/ProfissionalController';

const routes = Router();
const adminController = new AdminController();
const pacienteController = new PacienteController();
const profissionalController = new ProfissionalController();

routes.get('/', (req, res) => {
    return res.status(200).send({ page: "home page sidoso"});
});

/* --------------------PACIENTE ROUTES-------------------- */

routes.post('/registrar/paciente/', pacienteController.store);

routes.post('/login/paciente/', pacienteController.login);

routes.get('/paciente/:id/', [authentication], pacienteController.getById);

routes.patch('/paciente/:id/editar/', [authentication], pacienteController.update);

routes.get('/paciente/:id/consulta/', [authentication], pacienteController.getConsultas);

/* --------------------PROFISSIONAL ROUTES-------------------- */

routes.post('/login/profissional/', profissionalController.login);

routes.get('/profissional/:id/', [authentication], profissionalController.getProfissionalById);

routes.post('/profissional/:id/especialidade/adicionar/', [authentication], profissionalController.addProfEspecialidade);

routes.post('/profissional/:id/consulta/marcar/', [authentication], profissionalController.createConsulta);

routes.get('/profissional/:id/consulta/', [authentication], profissionalController.getConsultas);

routes.get('/profissional/:id/financeiro/', [authentication], profissionalController.getFinancial);

/* --------------------ADMIN ROUTES-------------------- */

// register a new admin (Need pre-authentication )
routes.post('/admin/:id/registrar/administrador/', [authentication], adminController.store);

routes.post('/login/admin/', adminController.login);

routes.get('/admin/:id/paciente/', [authentication], adminController.getAllPacientes);

routes.get('/admin/:id/profissional/', [authentication], adminController.getAllProfissionais);

routes.post('/admin/:id/registrar/profissional/', [authentication], adminController.createProfissional);

routes.get('/admin/:id/profissao/', [authentication], adminController.getAllProfissoes);

routes.post('/admin/:id/registrar/profissao/', [authentication], adminController.createProfissao);

routes.post('/admin/:id/registrar/especialidade/', [authentication], adminController.createEspecialidade);

routes.get('/admin/:id/especialidade/', [authentication], adminController.getAllEspecialidades);

routes.post('/admin/:id/registrar/associado/', [authentication], adminController.registerAssociado);

routes.get('/admin/:id/associado/', [authentication], adminController.getAllAssociados);

routes.post('/admin/:id/consulta/pagamento/', [authentication], adminController.payConsulta);

export default routes;