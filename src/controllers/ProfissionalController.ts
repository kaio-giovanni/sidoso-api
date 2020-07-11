import { Request, Response } from 'express';
import { Profissional } from '../models/Profissional';
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
}

export default ProfissionalController;