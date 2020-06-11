import authConfig from '../config/auth';
import jwt from 'jsonwebtoken';

enum Role {
    PACIENTE = "PACIENTE",
    PROFISSIONAL = "PROFISSIONAL",
    ADMIN = "ADMIN"
}

export class TokenJwt {

    static readonly prefix = "sidoso ";
    static readonly role = Role;

    constructor(){}

    public static generateToken(id: number, email: string, cpf: string, role: Role): string{
        const token = jwt.sign({
            userId: id,
            email,
            cpf,
            role 
        },
        ""+ authConfig.secret_key,
        {                
            expiresIn: authConfig.expiresIn
        });

        return this.prefix + token;
    }

    public static decodedToken(token: string): any {
        let value = { success: false, body: {} };

        jwt.verify(token, ""+authConfig.secret_key, (err, decoded) => {
            if(err){
                value = {success: false, body: err};
            }else {
                value = {success: true, body: { decoded }};
            }
        });

        return value;
    }

    public static refreshToken(token: string){

    }

}
