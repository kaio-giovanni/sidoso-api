"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const database_1 = __importDefault(require("../config/database"));
class DBConnection {
    constructor() { }
    static getInstance() {
        if (DBConnection.conn === null) {
            DBConnection.conn = typeorm_1.createConnection(database_1.default);
        }
        return DBConnection.conn;
    }
}
exports.default = DBConnection;
//# sourceMappingURL=connection.js.map