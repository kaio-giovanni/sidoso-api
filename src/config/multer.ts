import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Request } from 'express';

const storageTypes = {
    local: multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb: Function) => {
            cb(null, path.resolve(__dirname, "..", "..", "public", "images"));
        },
        filename: (req: Request, file: Express.Multer.File, cb: Function) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-sidoso-${file.originalname}`;

                cb(null, fileName);
            });
        }
    }),
    amazonS3: {
        // armazenamento no bucket s3 da amazon
    }
}

export default {
    dest: path.resolve(__dirname, "..", "..", "public", "images"),
    storage: storageTypes["local"],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    },
};