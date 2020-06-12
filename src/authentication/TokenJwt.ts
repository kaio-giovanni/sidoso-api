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

    // usado depois do middleware de auth, para verificar userRole === decodedRole
    public static verifyRole(authorization: string, role: Role): any{
        // header authorization  
        // authorization format: prefix + token + decodedRole
        let value = { success: false, body: {} };
        
        if(authorization === undefined || authorization === null){
            value = { success: false, body: {
                error: "Authentication failed",
                message: "Authorization header not found"
            }};
            return value;
        }
        const splitAuth = authorization.split(" ");

        if(!(splitAuth.length === 3)){
            value = { success: false, body: {
                error: "Authentication failed",
                message: "Authorization header malformatted"
            }};
            return value;
        }
        
        const [prefix, token, decodedRole] = splitAuth;

        if(decodedRole !== role){
            value = { success: false, body: {
                error: "Permission not granted",
                message: "Access denied ! unsupported role"
            }};
            return value;
        }

        value = { success: true, body: {
            userToken: this.prefix + token
        }};

        return value;
    }
}
