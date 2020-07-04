"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var dotenv_1 = __importDefault(require("dotenv"));
// Loads .env file into process.env
dotenv_1.default.config();
var app_port = process.env.PORT;
var app_host = process.env.HOST;
app_1.default.listen(app_port, function () {
    console.log("Server is running in : " + app_host + ":" + app_port);
});
//# sourceMappingURL=server.js.map