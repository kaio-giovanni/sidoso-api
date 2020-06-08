import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

/** status code http
 * { 200: ok, 201: created, 400: bad request, 401: unauthenticated, 403: Forbidden, 404: not found, 406: not acceptable
 * 
 * 
 * 
 */

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    return res.json({ name: "middleware auth", success: false});
}

export default authentication;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYWNpZW50ZUlkIjoxLCJlbWFpbCI6ImthaW8uZ2lvdmFubmlAaG90bWFpbC5jb20iLCJpYXQiOjE1OTE1ODIxNjcsImV4cCI6MTU5MTU5MDc2N30.3vkbr2gluSRLP3udK77ccijw1U99ycAkkvDlS0zPgPk