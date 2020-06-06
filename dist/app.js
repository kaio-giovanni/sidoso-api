"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const bodyParser_1 = __importDefault(require("./config/bodyParser"));
const cors_2 = __importDefault(require("./config/cors"));
class App {
    // constructor method
    constructor() {
        this.express = express_1.default();
        this.middlewares();
        this.routes();
    }
    // returns express object
    getExpress() {
        return this.express;
    }
    // middlewares
    middlewares() {
        this.express.use(cors_1.default(cors_2.default));
        this.express.use(body_parser_1.default.json(bodyParser_1.default.json));
        this.express.use(body_parser_1.default.urlencoded(bodyParser_1.default.urlencoded));
    }
    // routes
    routes() {
        this.express.use(routes_1.default);
    }
}
exports.default = new App().getExpress();
//# sourceMappingURL=app.js.map