import { Request, Response } from 'express';
import { Paciente } from '../models/Paciente';
import { Consulta } from '../models/Consulta';
import { Profissional } from '../models/Profissional';
import { Associado } from '../models/Associado';
import { TokenJwt } from '../middlewares/auth/TokenJwt';
import connection from '../database/connection';

class PacienteController {

    // get paciente by id
    public async getById(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.PACIENTE);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const userId = req.params.id;            
            const pacienteRepository = conn.getRepository(Paciente);
            try{
                const paciente = await pacienteRepository.findOneOrFail({
                    select: [
                        "id", "is_active", "photo", "name", "birth", "cpf", "genre", "phone_main", "phone_secondary", "email"
                    ],
                    where: {
                        id: userId
                    }
                });
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
    public async login(req: Request, res: Response){
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
                TokenJwt.role.PACIENTE
            );

            res.setHeader("authorization", token);
            return res.status(200).send(paciente); 
        }).catch(error => {
            return res.status(406).send({ error: "An error has occurred", mesage: error });
        });
    }

    // create a new paciente
    public async store(req: Request, res: Response){
        connection.then(async conn => {
            const data = req.body;

            const pacienteRepository = conn.getRepository(Paciente);
            const paciente = pacienteRepository.create();
            
            try{
                paciente.photo = req.file.filename;
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
    public async update(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.PACIENTE);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const userId = req.params.id;
            const {
                phone_main,
                phone_secondary } = req.body;
            const photo = req.file.filename;

            const pacienteRepository = conn.getRepository(Paciente);
            try{
                await pacienteRepository.update(userId, {
                    photo, phone_main, phone_secondary
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
    public async destroy(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.PACIENTE);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const userId = req.params.id;
           
            const pacienteRepository = conn.getRepository(Paciente);
            try{
                await pacienteRepository.update(userId, {
                    is_active: false
                });

                return res.status(200).send({ success: true });
            }catch(error){
                return res.status(400).send({ error: "Editing failure", message: error });
            }

        }).catch(error => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }

    // get consultas
    public async getConsultas(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.PACIENTE);

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
                    .where("consulta.paciente = :userId", { userId })
                    .getMany();
                    
                return res.status(200).send(consultas);
            }catch(error){
                return res.status(401).send({ error: "Error in get consulta", message: error });
            }
        }).catch((error) => {
            return res.status(406).send({ error: "An error has occured", message: error });
        });
    }

    public async getAllProfissionais(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.PACIENTE);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const profissionalRepository = conn.getRepository(Profissional);
         
            try{
                const profissionais = await profissionalRepository.createQueryBuilder("profissional")
                    .leftJoinAndSelect("profissional.profissao", "profissao")
                    .leftJoinAndSelect("profissional.profespec", "profespec")
                    .leftJoinAndSelect("profespec.especialidade", "especialidade")
                    .select([
                        "profissional.id", "profissional.is_active", "profissional.name", "profissional.photo",
                        "profissional.birth", "profissional.cpf","profissional.genre", "profissional.phone_main",
                        "profissional.phone_secondary", "profissional.email", "profissao.name",
                        "profespec.id", "especialidade.name", "especialidade.description"
                    ])
                    .where("profissional.is_active =:active", { active: 1})
                    .getMany();
                return res.status(200).send(profissionais);
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

    public async getAllAssociados(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.PACIENTE);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);
            
            const associadoRepository = conn.getRepository(Associado);
            try{
                const associados = await associadoRepository.createQueryBuilder("associado")
                    .select([
                        "id", "name", "is_active", "phone_main", "phone_secondary",
                        "email", "latitude", "longitude", "logo", "update_at"
                    ])
                    .where("associado.is_active =:active", { active: 1 })
                    .getMany();
                
                return res.status(200).send(associados); 
            }catch(error){
                return res.status(401).send({
                    error: "Associado not found",
                    message: error
                });
            }
        }).catch((error) => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }
}

export default PacienteController;