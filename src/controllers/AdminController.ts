import { Request, Response } from 'express';
import { Admin } from '../models/Admin';
import { Paciente } from '../models/Paciente';
import { Profissional } from '../models/Profissional';
import { Profissao } from '../models/Profissao';
import { TokenJwt } from '../authentication/TokenJwt';
import connection from '../database/connection';

class AdminController {

    // login admin
    public login(req: Request, res: Response){
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
    public store(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

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

    // ----------------- PACIENTES ----------------- //
    public getAllPacientes(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const pacienteRepository = conn.getRepository(Paciente);
            try{
                const pacientes = await pacienteRepository.find({ where: { is_active: 1 } });
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

    // ----------------- PROFISSIONAIS ----------------- //    
    public createProfissional(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);
            
            const data = req.body;

            const profissionalRepository = conn.getRepository(Profissional);
            const profissional = profissionalRepository.create();
            
            try{
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

    public getAllProfissionais(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);

            const profissionalRepository = conn.getRepository(Profissional);
            try{
                const profissionais = await profissionalRepository.find({
                    where: { is_active: 1 },
                    relations: ["profissao"]
                });
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

    // ----------------- PROFISSOES ----------------- //    
    public createProfissao(req: Request, res: Response){
        connection.then(async conn => {
            const vrfyRole = TokenJwt.verifyRole(req.headers.authorization!, TokenJwt.role.ADMIN);

            if(!vrfyRole.success)
                return res.status(403).send(vrfyRole.body);
        
            const { profissao_name } = req.body;
        
            const profissaoRepository = conn.getRepository(Profissao);
            const profissao = profissaoRepository.create();
            
            try{
                profissao.name = profissao_name;
                await profissaoRepository.save(profissao);

                return res.status(201).send({ success: true});
            }catch(error){
                return res.status(400).send({ error: "Registration failure", message: error });
            }
    
        }).catch((error) => {
            return res.status(406).send({ error: "An error has occurred", message: error });
        });
    }

    public getAllProfissoes(req: Request, res: Response){
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
}

export default AdminController;