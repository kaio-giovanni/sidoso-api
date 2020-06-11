import { Request, Response, NextFunction } from 'express';
import { TokenJwt } from '../authentication/TokenJwt';

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

    const result = TokenJwt.decodedToken(token);

    if(!result.success) 
        return res.status(403).send({ error: "Authentication failed", message: result.body});

    if(req.params.id != result.body.decoded.userId) 
        return res.status(403).send({ error: "Authentication failed", message: "Access denied!" });
    
    req.headers.authorization = result.body.decoded.role;
    return next();
    
}

export default authentication;