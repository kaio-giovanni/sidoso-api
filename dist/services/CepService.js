"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CepService = void 0;
var http_1 = __importDefault(require("http"));
var CepService = /** @class */ (function () {
    function CepService() {
    }
    CepService.prototype.getAdressByCep = function (cep) {
        var options = {
            host: CepService.API_URL,
            path: cep + "/json"
        };
        var callback = function (res) {
            var adrress = {};
            res.on('data', function (chunk) {
                adrress += chunk;
            });
            res.on('end', function () {
                console.log(adrress);
            });
        };
        http_1.default.request(options, callback).end();
    };
    /** Obter informações de localidades
     * Ex: viacep.com.br/ws/01001000/json/
     * Ex: viacep.com.br/ws/RS/Porto Alegre/Domingos+Jose/json/
     *  */
    CepService.API_URL = "viacep.com.br/ws/";
    return CepService;
}());
exports.CepService = CepService;
//# sourceMappingURL=CepService.js.map