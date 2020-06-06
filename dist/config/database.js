"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = {
    name: "default_connection",
    type: process.env.DB_DIALECT || "mysql",
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    entities: ["../entity/*.ts"],
    migrations: ["../migrations/*.ts"],
    cli: {
        migrationsDir: "../migrations"
    }
};
exports.default = dbConfig;
//# sourceMappingURL=database.js.map