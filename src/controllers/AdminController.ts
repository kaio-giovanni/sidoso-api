import { Request, Response } from 'express';
import { Admin } from '../models/Admin';
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
                admin.cpf,
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
            const role = req.headers.authorization;

            if(!role || role !== TokenJwt.role.ADMIN){
                return res.status(403).send({
                    error: "Permission not granted",
                    message: "Access denied ! unsupported role"
                });
            }

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
}

export default AdminController;