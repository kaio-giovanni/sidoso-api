import { Router } from 'express';
import PacienteController from './controllers/PacienteController';

const routes = Router();
const pacienteController = new PacienteController();

routes.get('/', (req, res) => {
    return res.json({ title: 'Hello World' });
});

routes.get('/pacientes', pacienteController.index);

export default routes;