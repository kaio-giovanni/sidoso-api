import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import parserConfig from './config/bodyParser';
import corsConfig from './config/cors';
import path from 'path';

class App {
    private express: express.Application;

    // constructor method
    constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
    }

    // returns express object
    public getExpress() {
        return this.express;
    }

    // global middlewares
    private middlewares():void {
        this.express.use(express.static(path.join(__dirname, '..', 'public')));
        this.express.use(cors(corsConfig));
        this.express.use(bodyParser.json(parserConfig.json));
        this.express.use(bodyParser.urlencoded(parserConfig.urlencoded));
    }

    // routes
    private routes(): void {
        this.express.use(routes);
    }
}
export default new App().getExpress();

