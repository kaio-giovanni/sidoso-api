"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var bodyParser_1 = __importDefault(require("./config/bodyParser"));
var cors_2 = __importDefault(require("./config/cors"));
var App = /** @class */ (function () {
    // constructor method
    function App() {
        this.express = express_1.default();
        this.middlewares();
        this.routes();
    }
    // returns express object
    App.prototype.getExpress = function () {
        return this.express;
    };
    // global middlewares
    App.prototype.middlewares = function () {
        this.express.use(cors_1.default(cors_2.default));
        this.express.use(body_parser_1.default.json(bodyParser_1.default.json));
        this.express.use(body_parser_1.default.urlencoded(bodyParser_1.default.urlencoded));
    };
    // routes
    App.prototype.routes = function () {
        this.express.use(routes_1.default);
    };
    return App;
}());
exports.default = new App().getExpress();
//# sourceMappingURL=app.js.map