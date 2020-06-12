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

    let [ scheme, token ] = parts;
    if(!/^sidoso$/i.test(scheme)){
        return res.status(401).send({ error: "Authentication failed", message: "Token malformatted" });
    }

    const result = TokenJwt.decodedToken(token);// return error | decoded 

    if(!result.success) {
        if(result.body.name === "TokenExpiredError"){
            // Refresh Token (?)
            return res.status(403).send({ error: "Authentication failed", message: "Refresh token"});
        }else{
            // Invalid Token
            return res.status(403).send({ error: "Authentication failed", message: result.body});
        }
    }else{
        if(req.params.id != result.body.decoded.userId) 
            return res.status(403).send({ error: "Authentication failed", message: "Access denied!" });
        
        // set authorization header: prefix + token + user role 
        req.headers.authorization = TokenJwt.prefix + token + " " + result.body.decoded.role;
        // go to next 
        return next();
    }
}

export default authentication;