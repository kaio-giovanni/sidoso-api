import { Request, Response } from 'express';
import { Admin } from '../models/Admin';
import { Paciente } from '../models/Paciente';
import { Profissional } from '../models/Profissional';
import { Profissao } from '../models/Profissao';
import { Especialidade } from '../models/Especialidade';
import { TokenJwt } from '../middlewares/auth/TokenJwt';
import { Associado } from '../models/Associado';
import { PagConsulta } from '../models/PagConsulta';
import connection from '../database/connection';
import fs from 'fs';
import path from 'path';

class AdminController {

    //get static files list (Ex: images)
    public async getStaticFiles(req: Request, res: Response){
        const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

        if(!vrfyRole.success)
            return res.status(403).send(vrfyRole.body);

        const type = req.query.type;
        let files: string[] = [];
        try {
            switch(type){
                case 'img':
                    files = fs.readdirSync(path.join(__dirname, '..', '..','public', 'images'));
                    break;
                case undefined:
                    files[0] = "unspecified file type";
                    break;
                default:
                    files = []
                    break;
            }

            return res.status(200).send({ "type": type, "content": files });
        }catch(error){
            return res.status(406).send({ error: "An error has occurred", message: error });
        }
    }

    // delete static files (Ex: image files)
    public async delImageFiles(req: Request, res: Response){
        const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

        if(!vrfyRole.success)
            return res.status(403).send(vrfyRole.body);

        const { filename } = req.query;

        if (!filename)
            return res.status(406).send({
                error: "An error has occurred",
                message: "no filename provided"
            });

        fs.unlink(path.join(__dirname, '..', '..', 'public', 'images') + "/" + filename, (error) => {
            if (error) 
                return res.status(406).send({ error: "An error has occurred", message: error });

            return res.status(200).send({ message: "successfully deleted " + filename });
        });
    }
    
    // login admin
    public async login(req: Request, res: Response){
        connection.then(async conn => {
            const { email, password } = req.body;

            if(!(email && password)) {
                return res.status(400).send({
                    error: "User not found",
                    message: "Email and password field are required"
                });
            }

            const adminRepository = conn.getRepository(Admin);
            let admin: Admin;
            try{
                admin = await adminRepository.findOneOrFail({ where: { email } });
            }catch(error){
                return res.status(401).send({
                    error: "User not found",
                    message: "Please, make sure you entered you email correctly"
                });
            }

            if(!await admin.checkPassword(password)){
                return res.status(401).send({
                    error: "Password is incorrect",
                    message: "Please, make sure you entered your password correctly"
                });
            }

            // generate token with unique user information
            const token = TokenJwt.generateToken(
                admin.id,
                admin.email,
                TokenJwt.role.ADMIN
           );

            res.setHeader("authorization", token);
            return res.status(200).send(admin); 
        }).catch(error => {
            return res.status(406).send({ error: "An error has occurred", mesage: error }); 
        });
    }

    // create a new admin
    public async store(req: Request, res: Response){
        connection.then(async conn => {
            const data = req.body;

            const adminRepository = conn.getRepository(Admin);
            const admin = adminRepository.create();
            
            try{
                admin.name = data.name;
                admin.birth = data.birth;
                admin.cpf = data.cpf;
                admin.email = data.email;
                admin.password = data.password;

                await adminRepository.save(admin);

                return res.status(201).send({ success: true});
            }catch(error){
                return res.status(400).send({ error: "Registration failure", message: error });
            }

        }).catch(error => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }

    // get all pacientes
    public async getAllPacientes(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const pacienteRepository = conn.getRepository(Paciente);
            try{
                const pacientes = await pacienteRepository.find({
                    select: [
                        "id", "is_active", "photo", "name", "birth",
                        "genre", "phone_main", "phone_secondary", "email"
                    ],
                    where: {
                        is_active: 1
                    }
                });
                return res.status(200).send(pacientes); 
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

    // set paciente.is_active to false
    public async deletePaciente(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const { pacienteId } = req.body;
           
            const pacienteRepository = conn.getRepository(Paciente);
            try{
                await pacienteRepository.update(pacienteId, {
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

    public async deleteProfissional(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const { profissionalId } = req.body;

            const profissionalRepository = conn.getRepository(Profissional);
            try {
                await profissionalRepository.update(profissionalId, {
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

    // create a new profissional
    public async createProfissional(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);
            
            const data = req.body;

            const profissionalRepository = conn.getRepository(Profissional);
            const profissional = profissionalRepository.create();
            
            try{
                profissional.photo = req.file.filename;
                profissional.name = data.name;
                profissional.birth = data.birth;
                profissional.cpf = data.cpf;
                profissional.genre = data.genre;
                profissional.phone_main = data.phone_main;
                profissional.phone_secondary = data.phone_secondary;
                profissional.profissao = data.profissao;
                profissional.email = data.email;
                profissional.password = data.password;

                await profissionalRepository.save(profissional);

                return res.status(201).send({ success: true});
            }catch(error){
                return res.status(400).send({ error: "Registration failure", message: error });
            }
        }).catch((error) => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }

    // get all profissionais
    public async getAllProfissionais(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const profissionalRepository = conn.getRepository(Profissional);
         
            try{
                const profissionais = await profissionalRepository.createQueryBuilder("profissional")
                    .leftJoinAndSelect("profissional.profissao", "profissao")
                    .leftJoinAndSelect("profissional.profespec", "profespec")
                    .leftJoinAndSelect("profespec.especialidade", "especialidade")
                    .select([
                        "profissional.id", "profissional.is_active", "profissional.name", "profissional.birth",
                        "profissional.genre", "profissional.phone_main", "profissional.phone_secondary",
                        "profissional.email", "profissao.name", "profespec.id", "especialidade.name", "especialidade.description"
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

    // create a new profissao
    public async createProfissao(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);
        
            const profissaoRepository = conn.getRepository(Profissao);
            const profissao = profissaoRepository.create();
            
            try{
                profissao.name = req.body.profissao_name;
                await profissaoRepository.save(profissao);
                
                return res.status(201).send({ success: true});
            }catch(error){
                return res.status(400).send({ error: "Registration failure", message: error });
            }
    
        }).catch((error) => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }

    // get all profissoes
    public async getAllProfissoes(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const profissaoRepository = conn.getRepository(Profissao);
            try{
                const profissoes = await profissaoRepository.find();
                return res.status(200).send(profissoes); 
            }catch(error){
                return res.status(401).send({
                    error: "Profissao not found",
                    message: error
                });
            }
        }).catch((error) => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }

    // create especialidade
    public async createEspecialidade(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const especialidadeRepository = conn.getRepository(Especialidade);
            const especialidade = especialidadeRepository.create();
            try{
                especialidade.name = req.body.esp_name;
                especialidade.description = req.body.esp_desc;
                especialidade.profissao = req.body.esp_prof;
                await especialidadeRepository.save(especialidade);
                
                return res.status(201).send({ success: true});
            }catch(error){
                return res.status(400).send({ error: "Registration failure", message: error });
            }
        }).catch((error) => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }

    //get all especialidades
    public async getAllEspecialidades(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const especialidadeRepository = conn.getRepository(Especialidade);
            try{
                const especialidades = await especialidadeRepository.find({
                    relations: ["profissao"]
                });
                return res.status(200).send(especialidades); 
            }catch(error){
                return res.status(401).send({
                    error: "Especialidade not found",
                    message: error
                });
            }
        }).catch((error) => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }

    // register associado
    public async registerAssociado(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const associadoRepository = conn.getRepository(Associado);
            const associado = associadoRepository.create();
            try{
                associado.name = req.body.name;
                associado.type = req.body.type;
                associado.cnpj = req.body.cnpj;
                associado.phone_main = req.body.phone_main;
                associado.phone_secondary = req.body.phone_secondary;
                associado.email = req.body.email;
                associado.latitude = req.body.latitude;
                associado.longitude = req.body.longitude;
                associado.logo = req.file.filename;

                await associadoRepository.save(associado);
                
                return res.status(201).send({ success: true});
            }catch(error){
                return res.status(400).send({ error: "Registration failure", message: error });
            }
        }).catch((error) => {
            return res.status(406).send({ error: "An error as occured", message: error });
        });
    }

    // get all associados
    public async getAllAssociados(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);
            
            const associadoRepository = conn.getRepository(Associado);
            try{
                const associados = await associadoRepository.find(
                    {
                        where: {
                            is_active: 1
                    } 
                });

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

    // pagamento consulta
    public async payConsulta(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const payConsultaRepository = conn.getRepository(PagConsulta);
            const payConsulta = payConsultaRepository.create();
            try{
                payConsulta.consulta = req.body.consultaId;
                payConsulta.price = req.body.price;
                payConsulta.pay_value = req.body.pay_value;
                payConsulta.discount = req.body.discount;
                payConsulta.status = req.body.status;

                await payConsultaRepository.save(payConsulta);

                return res.status(200).send({ success: true});
            }catch(error){
                return res.status(400).send({ error: "Error making payment", message: error });
            }
        }).catch((error) => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }
}

export default AdminController;