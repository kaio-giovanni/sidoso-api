import { Request, Response } from 'express';
import { Profissional } from '../models/Profissional';
import { Consulta } from '../models/Consulta';
import { ProfEspec } from '../models/ProfEspec';
import { PagConsulta } from '../models/PagConsulta';
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
            const userId = req.params.id;
            try{
                const profissional = await profissionalRepository.createQueryBuilder("profissional")
                    .leftJoinAndSelect("profissional.profissao", "profissao")
                    .leftJoinAndSelect("profissional.profespec", "profespec")
                    .leftJoinAndSelect("profespec.especialidade", "especialidade")
                    .select([
                        "profissional.id", "profissional.is_active", "profissional.name", "profissional.birth",
                        "profissional.cpf", "profissional.genre", "profissional.phone_main", "profissional.phone_secondary",
                        "profissional.email", "profissao.name", "profespec.id", "especialidade.name", "especialidade.description"
                    ])
                    .where("profissional.id = :userId", { userId })
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
                const consultas = await consultaRepository.createQueryBuilder("consulta")
                    .leftJoinAndSelect("consulta.profissional", "profissional")
                    .leftJoinAndSelect("consulta.paciente", "paciente")
                    .select([
                        "consulta.id", "consulta.title", "consulta.date", "consulta.latitude", "consulta.longitude", "consulta.status",
                        "consulta.obs", "consulta.create_at", "consulta.update_at",
                        "profissional.id", "profissional.is_active", "profissional.name", "profissional.birth",
                        "profissional.cpf", "profissional.genre", "profissional.phone_main", "profissional.phone_secondary",
                        "profissional.email",
                        "paciente.id", "paciente.is_active", "paciente.name", "paciente.birth", "paciente.cpf", "paciente.genre", "paciente.phone_main",
                        "paciente.phone_secondary", "paciente.email"
                    ])
                    .where("consulta.profissional = :userId", { userId })
                    .getMany();

                return res.status(200).send(consultas);
            }catch(error){
                return res.status(401).send({ error: "Error in get consulta", message: error });
            }
        }).catch((error) => {
            return res.status(406).send({ error: "An error has occured", message: error });
        });
    }

    // get financial
    public async getFinancial(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.PROFISSIONAL);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const userId = req.params.id;
            const payConsultaRepository = conn.getRepository(PagConsulta);
            try{
                const payConsulta = await payConsultaRepository.createQueryBuilder("pagconsulta")
                    .leftJoinAndSelect("pagconsulta.consulta", "consulta")
                    .leftJoinAndSelect("consulta.profissional","profissional")
                    .leftJoinAndSelect("consulta.paciente","paciente")
                    .select([
                        "pagconsulta.id", "pagconsulta.price", "pagconsulta.pay_value", "pagconsulta.discount", "pagconsulta.status",
                        "pagconsulta.create_at", "pagconsulta.update_at",
                        "consulta.id", "consulta.title", "consulta.date", "consulta.latitude", "consulta.longitude", "consulta.status",
                        "consulta.obs", "consulta.create_at", "consulta.update_at",
                        "profissional.id", "profissional.is_active", "profissional.name", "profissional.birth",
                        "profissional.cpf", "profissional.genre", "profissional.phone_main", "profissional.phone_secondary",
                        "profissional.email",
                        "paciente.id", "paciente.is_active", "paciente.name", "paciente.birth", "paciente.cpf", "paciente.genre", "paciente.phone_main",
                        "paciente.phone_secondary", "paciente.email"
                    ])
                    .where("consulta.profissional = :userId", { userId })
                    .getMany();

                return res.status(200).send(payConsulta);
            }catch(error){
                return res.status(401).send({ error: "Error in get consultation payment", message: error });
            }
        }).catch((error) => {
            return res.status(406).send({ error: "An error has occurred", message: error })
        });
    }
}

export default ProfissionalController;