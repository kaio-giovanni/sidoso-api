import http from 'http';

export class CepService {
    /** Obter informações de localidades 
     * Ex: viacep.com.br/ws/01001000/json/
     * Ex: viacep.com.br/ws/RS/Porto Alegre/Domingos+Jose/json/
     *  */

    private static readonly API_URL = "viacep.com.br/ws/";
    
    public getAdressByCep(cep: string){
        const options = {
            host: CepService.API_URL,
            path: cep + "/json"
        }

        const callback = (res: http.IncomingMessage) => {
            let adrress = {};

            res.on('data', (chunk: any) => {
                adrress += chunk;
            });

            res.on('end', () => {
                console.log(adrress);
            });
        }

        http.request(options, callback).end();
    }
}