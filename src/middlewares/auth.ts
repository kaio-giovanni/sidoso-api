import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

/** 
 * Check token 
 */

const authentication = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ error: "Authentication failed", message: "No token provided" });
    }

    const parts = authHeader.split(" ");
    if(!(parts.length === 2)){
        return res.status(401).send({ error: "Authentication failed", message: "Token error parts" });
    }

    const [ scheme, token ] = parts;
    if(!/^sidoso$/i.test(scheme)){
        return res.status(401).send({ error: "Authentication failed", message: "Token malformatted" });
    }

    jwt.verify(token, ""+authConfig.secret_key, (err, decoded: any) => {
        if(err) return res.status(401).send({ error: "Token invalid", message: err });

        if(req.params.id != decoded.userId) 
            return res.status(403).send({ error: "Authentication failed", message: "Access denied" });
        
        req.headers.authorization = decoded.role;
        return next();
    });
}

export default authentication;