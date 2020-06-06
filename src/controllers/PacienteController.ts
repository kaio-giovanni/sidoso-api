import { Request, Response } from 'express';

class Paciente {

    // get pacientes
    async index(req: Request, res: Response){
        const paciente = {
            name: 'Francisco',
            birth: '10/10/2000',
            cpf: '000.000.000-00',
            genrer: 'Masculino',
            phone_main: '(000) 00000-0000',
            phone_secondary: '(000) 00000-0000',
            email: 'francisco@gmail.com',
            password: 'AKCBSLILEKJLSLKCLKSAJLKDSA'
        };
        return res.json(paciente);
    }

    // create a new paciente
    async store(req: Request, res: Response){

    }

    // update a paciente
    async update(req: Request, res: Response){

    }

    // delete a paciente
    async destroy(req: Request, res: Response){

    }
}

export default Paciente;