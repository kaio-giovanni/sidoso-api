"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
// Loads .env file into process.env
dotenv_1.default.config();
const app_port = process.env.PORT;
const app_host = process.env.HOST;
app_1.default.listen(app_port, () => {
    console.log(`Server is running in : ${app_host}:${app_port}`);
});
//# sourceMappingURL=server.js.map