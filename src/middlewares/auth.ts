import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

/** status code http
 * { 200: ok, 201: created, 400: bad request, 401: unauthenticated, 403: Forbidden, 404: not found, 406: not acceptable
 */

const authentication = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ error: "No token provided"});
    }

    const parts = authHeader.split(" ");
    if(!(parts.length === 2)){
        return res.status(401).send({ error: "Token error parts" });
    }

    const [ scheme, token ] = parts;
    if(!/^sidoso$/i.test(scheme)){
        return res.status(401).send({ error: "Token malformatted" });
    }

    jwt.verify(token, ""+authConfig.secret_key, (err, decoded) => {
        if(err) return res.status(401).send({ error: "Token invalid" });

        return next();
    });
}

export default authentication;