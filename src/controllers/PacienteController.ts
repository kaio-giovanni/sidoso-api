import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Paciente } from '../models/Paciente';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import connection from '../database/connection';

class PacienteController {

    // select * from pacientes where pacientes.is_active = '1'
    async index(req: Request, res: Response){
        return res.send({ name: "index", success: true});
    }

    // get paciente by id
    async getById(req: Request, res: Response){
        return res.json({ name: "getById", success: true});
    }

    // login paciente
    async login(req: Request, res: Response){
        connection.then(async conn => {
            const { email, password } = req.body;

            if(!(email && password)) {
                return res.status(400).send({ error: "email and password field are required" });
            }
            const pacienteRepository = conn.getRepository(Paciente);

            // get user from database
            let paciente: Paciente;
            try{
                paciente = await pacienteRepository.findOneOrFail({ where: { email } });
            }catch(error){
                return res.status(401).send({ error: "User (paciente) not found" });
            }

            if(!await paciente.checkPassword(password)){
                return res.status(401).send({ error: "Password is incorrect" });
            }

            // generate token 
            const token = jwt.sign({pacienteId: paciente.id, email: paciente.email}, 
                ""+ authConfig.secret_key,
                {
                    expiresIn: authConfig.expiresIn
                });

            res.setHeader("authorization", "sidoso "+token);
            return res.status(200).send(paciente); 
        }).catch(error => {
            return res.status(406).send({ error });
        });
    }

    // create a new paciente
    async store(req: Request, res: Response){
        connection.then(async conn => {

            const data = req.body;

            const pacienteRepository = conn.getRepository(Paciente);

            const paciente = pacienteRepository.create();
            
            try{
                paciente.name = data.name;
                paciente.birth = data.birth;
                paciente.cpf = data.cpf;
                paciente.genre = data.genre;
                paciente.phone_main = data.phone_main;
                paciente.phone_secondary = data.phone_secondary;
                paciente.email = data.email;
                paciente.password = data.password;

                await pacienteRepository.save(paciente);

                return res.status(201).send({ success: true});
            }catch(error){
                return res.status(400).send(error);
            }

        }).catch(error => {
            return res.status(406).send({ error });
        });
    }

    // update a paciente
    async update(req: Request, res: Response){

    }

    // set paciente.is_active to false
    async destroy(req: Request, res: Response){
        
    }
}

export default PacienteController;