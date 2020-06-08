"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const dbConfig = {
    name: "default",
    type: process.env.TYPEORM_CONNECTION || "mysql",
    host: process.env.TYPEORM_HOST || "localhost",
    port: parseInt(process.env.TYPEORM_PORT || "3306", 10),
    username: process.env.TYPEORM_USERNAME || "",
    password: process.env.TYPEORM_PASSWORD || "",
    database: process.env.TYPEORM_DATABASE || "",
    synchronize: process.env.TYPEORM_SYNCHRONIZE || false,
    entities: [path_1.default.join(__dirname, "..", "models", "**/*.{ts,js}")],
    migrations: [path_1.default.join(__dirname, "..", "database", "migrations", "**/*.{ts,js}")]
};
exports.default = dbConfig;
//# sourceMappingURL=database.js.map