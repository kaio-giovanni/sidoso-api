import https from 'https';

export class CepService {

    private static readonly API_URL = "https://viacep.com.br/ws/";
    
    /** Obter informações de localidades 
     * Ex: viacep.com.br/ws/01001000/json/
     * Ex: viacep.com.br/ws/RS/Porto Alegre/Domingos+Jose/json/
     *  */
    public getAdressByCep(cep: string): any {
        const url = CepService.API_URL + cep + "/json/";
        let data = '';

        https.get(url , (req) => {           
            req.on('data', (chunk) => {
                data += chunk;
            });

            req.on('end', () => {
                return data;
            })
        }).on('error', (error) => {
            console.log(error);
        });
    }
}