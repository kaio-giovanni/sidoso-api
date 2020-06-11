import { Request, Response } from 'express';
import { Paciente } from '../models/Paciente';
import { TokenJwt } from '../authentication/TokenJwt';
import connection from '../database/connection';

class PacienteController {

    // select * from pacientes where pacientes.is_active = '1'
    public index(req: Request, res: Response){
        return res.send({ name: "index", success: true});
    }

    // get paciente by id
    public getById(req: Request, res: Response){
        connection.then(async conn => {
            const userId = req.params.id;
            const role = req.headers.authorization;

            if(!role || role !== TokenJwt.role.PACIENTE){
                return res.status(403).send({
                    error: "Permission not granted",
                    message: "Access denied ! unsupported role"
                });
            }
            
            const pacienteRepository = conn.getRepository(Paciente);
            try{
                const paciente = await pacienteRepository.findOneOrFail({ where: { id: userId } });
                return res.status(200).send(paciente); 
            }catch(error){
                return res.status(401).send({
                    error: "User not found",
                    message: error
                });
            }
        }).catch((error) => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }

    // login paciente
    public login(req: Request, res: Response){
        connection.then(async conn => {
            const { email, password } = req.body;

            if(!(email && password)) {
                return res.status(400).send({
                    error: "User not found",
                    message: "Email and password field are required"
                });
            }

            const pacienteRepository = conn.getRepository(Paciente);
            let paciente: Paciente;
            try{
                paciente = await pacienteRepository.findOneOrFail({ where: { email } });
            }catch(error){
                return res.status(401).send({
                    error: "User not found",
                    message: "Please, make sure you entered you email correctly"
                });
            }

            if(!await paciente.checkPassword(password)){
                return res.status(401).send({
                    error: "Password is incorrect",
                    message: "Please, make sure you entered your password correctly"
                });
            }

            // generate token with unique user information
            const token = TokenJwt.generateToken(
                paciente.id,
                paciente.email,
                paciente.cpf,
                TokenJwt.role.PACIENTE
            );

            res.setHeader("authorization", token);
            return res.status(200).send(paciente); 
        }).catch(error => {
            return res.status(406).send({ error: "An error has occurred", mesage: error });
        });
    }

    // create a new paciente
    public store(req: Request, res: Response){
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
                return res.status(400).send({ error: "Registration failure", message: error });
            }

        }).catch(error => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }

    // update a paciente
    public update(req: Request, res: Response){
        connection.then(async conn => {
            const userId = req.params.id;
            const role = req.headers.authorization;

            if(!role || role !== TokenJwt.role.PACIENTE){
                return res.status(403).send({
                    error: "Permission not granted",
                    message: "Access denied ! unsupported role"
                });
            }

            const {
                phone_main,
                phone_secondary } = req.body;

            const pacienteRepository = conn.getRepository(Paciente);
            try{
                const paciente = await pacienteRepository.update(userId, {
                    phone_main, phone_secondary
                });

                return res.status(200).send({ success: true });
            }catch(error){
                return res.status(400).send({ error: "Editing failure", message: error });
            }

        }).catch(error => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }

    // set paciente.is_active to false
    public destroy(req: Request, res: Response){
        
    }
}

export default PacienteController;