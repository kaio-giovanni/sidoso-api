import { Request, Response } from 'express';
import { Profissional } from '../models/Profissional';
import { Consulta } from '../models/Consulta';
import { ProfEspec } from '../models/ProfEspec';
import { TokenJwt } from '../authentication/TokenJwt';
import connection from '../database/connection';

class ProfissionalController {    

    // login profissional
    public async login(req: Request, res: Response){
        connection.then(async conn => {
            const { email, password } = req.body;

            if(!(email && password)) {
                return res.status(400).send({
                    error: "User not found",
                    message: "Email and password field are required"
                });
            }

            const profRepository = conn.getRepository(Profissional);
            let prof: Profissional;
            try{
                prof = await profRepository.findOneOrFail({ where: { email } });
            }catch(error){
                return res.status(401).send({
                    error: "User not found",
                    message: "Please, make sure you entered you email correctly"
                });
            }

            if(!await prof.checkPassword(password)){
                return res.status(401).send({
                    error: "Password is incorrect",
                    message: "Please, make sure you entered your password correctly"
                });
            }

            // generate token with unique user information
            const token = TokenJwt.generateToken(
                prof.id,
                prof.email,
                TokenJwt.role.PROFISSIONAL
           );

            res.setHeader("authorization", token);
            return res.status(200).send(prof); 
        }).catch(error => {
            return res.status(406).send({ error: "An error has occurred", mesage: error }); 
        });
    }

    // get profissional by id
    public async getProfissionalById(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.PROFISSIONAL);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const profissionalRepository = conn.getRepository(Profissional);
         
            try{
                const profissional = await profissionalRepository.createQueryBuilder("profissional")
                    .leftJoinAndSelect("profissional.profissao", "profissao")
                    .leftJoinAndSelect("profissional.profespec", "profespec")
                    .leftJoinAndSelect("profespec.especialidade", "especialidade")
                    .getOne();
                return res.status(200).send(profissional);
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

    // add especialidade ao profissional
    public async addProfEspecialidade(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.PROFISSIONAL);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const profEspecRepository = conn.getRepository(ProfEspec);
            const profEspecialidade = profEspecRepository.create();
            try{
                profEspecialidade.profissional = req.body.profId;
                profEspecialidade.especialidade = req.body.especId;
                await profEspecRepository.save(profEspecialidade);

                return res.status(200).send({ success: true });
            }catch(error){
                return res.status(400).send({ error: "Editing failure", message: error });
            }

        }).catch(error => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }

    // create consulta
    public async createConsulta(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.PROFISSIONAL);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const consultaRepository = conn.getRepository(Consulta);
            const consulta = consultaRepository.create();
            const userId: any = req.params.id;
            try{
                consulta.title = req.body.title;
                consulta.profissional = userId;
                consulta.paciente = req.body.pacienteId;
                consulta.date = req.body.date;
                consulta.latitude = req.body.latitude;
                consulta.longitude = req.body.longitude;
                consulta.status = req.body.status;
                consulta.obs = req.body.obs;

                await consultaRepository.save(consulta);

                return res.status(200).send({ success: true });
            }catch(error){
                return res.status(400).send({ error: "Register failed", message: error });
            }
        }).catch((error) => {
            return res.status(406).send({ error: "An error as occured", message: error })
        });
    }

    // get consultas
    public async getConsultas(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.PROFISSIONAL);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);
            
            const userId = req.params.id;
            const consultaRepository = conn.getRepository(Consulta);
            try{
                const consultas = await consultaRepository.find({
                    where: {
                        profissional: userId
                    },
                    relations: [
                        "profissional",
                        "paciente"
                    ]
                });

                return res.status(200).send(consultas);
            }catch(error){
                return res.status(401).send({ error: "Error in get consulta", message: error });
            }
        }).catch((error) => {
            return res.status(406).send({ error: "An error has occured", message: error });
        });
    }
}

export default ProfissionalController;