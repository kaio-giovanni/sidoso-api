import { Request, Response } from 'express';
import { Paciente } from '../models/Paciente'

class PacienteController {

    // select * from pacientes where pacientes.is_active = '1'
    async index(req: Request, res: Response){
        
    }

    // get paciente by id
    async getById(req: Request, res: Response){
        
    }

    // login paciente
    async login(req: Request, res: Response){

    }

    // create a new paciente
    async store(req: Request, res: Response){

    }

    // update a paciente
    async update(req: Request, res: Response){

    }

    // set paciente.is_active to false
    async destroy(req: Request, res: Response){
        
    }
}

export default PacienteController;