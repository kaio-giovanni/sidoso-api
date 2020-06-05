import express from 'express';
import routes from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import parserConfig from './config/bodyParser';
import corsConfig from './config/cors';

class App {
    public express: express.Application;

    constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares():void {
        this.express.use(cors(corsConfig));
        this.express.use(bodyParser.json(parserConfig.json));
        this.express.use(bodyParser.urlencoded(parserConfig.urlencoded));
    }

    private routes(): void {
        this.express.use(routes);
    }
}
export default new App().express;

