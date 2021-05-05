import { Router } from 'express';

import authentication from './middlewares/auth/auth';
import multer from 'multer';
import multerConfigs from './config/multer';

import AdminController from './controllers/AdminController';
import PacienteController from './controllers/PacienteController';
import ProfissionalController from './controllers/ProfissionalController';

const routes = Router();
const adminController = new AdminController();
const pacienteController = new PacienteController();
const profissionalController = new ProfissionalController();

routes.get('/', (req, res) => {
    return res.status(200).send({
        page: "home page sidoso-api",
        author: "Kaio giovanni",
        description: "Back-end do projeto S-idoso: Saúde do idoso"
    });
});

/* --------------------PACIENTE ROUTES-------------------- */

routes.post('/registrar/paciente/', multer(multerConfigs).single('photo') ,pacienteController.store);

routes.post('/login/paciente/', pacienteController.login);

routes.get('/paciente/:id/', [authentication], pacienteController.getById);

routes.patch('/paciente/:id/editar/', [authentication, multer(multerConfigs).single('photo')] , pacienteController.update);

routes.get('/paciente/:id/consulta/', [authentication], pacienteController.getConsultas);

routes.get('/paciente/:id/profissionais/', [authentication], pacienteController.getAllProfissionais);

routes.get('/paciente/:id/associados/', [authentication], pacienteController.getAllAssociados);

/* --------------------PROFISSIONAL ROUTES-------------------- */

routes.post('/login/profissional/', profissionalController.login);

routes.get('/profissional/:id/', [authentication], profissionalController.getProfissionalById);

routes.post('/profissional/:id/especialidade/adicionar/', [authentication], profissionalController.addProfEspecialidade);

routes.post('/profissional/:id/consulta/marcar/', [authentication], profissionalController.createConsulta);

routes.get('/profissional/:id/consulta/', [authentication], profissionalController.getConsultas);

routes.patch('/profissional/:id/consulta/editar/', [authentication], profissionalController.updateConsulta);

routes.get('/profissional/:id/pacientes/', [authentication], profissionalController.getAllPacientes);

routes.get('/profissional/:id/financeiro/', [authentication], profissionalController.getFinancial);

/* --------------------ADMIN ROUTES-------------------- */

routes.post('/registrar/admin/', adminController.store);

routes.post('/login/admin/', adminController.login);

routes.get('/admin/:id/paciente/', [authentication], adminController.getAllPacientes);

routes.delete('/admin/:id/paciente/', [authentication], adminController.deletePaciente);

routes.get('/admin/:id/profissional/', [authentication], adminController.getAllProfissionais);

routes.delete('/admin/:id/profissional/', [authentication], adminController.deleteProfissional);

routes.post('/admin/:id/registrar/profissional/', [authentication, multer(multerConfigs).single('photo')], adminController.createProfissional);

routes.get('/admin/:id/profissao/', [authentication], adminController.getAllProfissoes);

routes.post('/admin/:id/registrar/profissao/', [authentication], adminController.createProfissao);

routes.post('/admin/:id/registrar/especialidade/', [authentication], adminController.createEspecialidade);

routes.get('/admin/:id/especialidade/', [authentication], adminController.getAllEspecialidades);

routes.post('/admin/:id/registrar/associado/', [authentication, multer(multerConfigs).single('photo')], adminController.registerAssociado);

routes.get('/admin/:id/associado/', [authentication], adminController.getAllAssociados);

routes.post('/admin/:id/consulta/pagamento/', [authentication], adminController.payConsulta);

routes.delete('/admin/:id/associado/', [authentication], adminController.deleteAssociado);

routes.get('/admin/:id/resources/', [authentication], adminController.getStaticFiles);

routes.delete('/admin/:id/resources/images/', [authentication], adminController.delImageFiles);

export default routes;