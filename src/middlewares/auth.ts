import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';


const authentication = async (req: Request, res: Response, next: NextFunction) => {
    return res.json({ name: "middleware auth", success: false});
}

export default authentication;