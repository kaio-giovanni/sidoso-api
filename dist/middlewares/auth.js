"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
/** status code http
 * { 200: ok, 201: created, 400: bad request, 401: unauthenticated, 403: Forbidden, 404: not found, 406: not acceptable
 */
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: "No token provided" });
    }
    const parts = authHeader.split(" ");
    if (!(parts.length === 2)) {
        return res.status(401).send({ error: "Token error parts" });
    }
    const [scheme, token] = parts;
    if (!/^sidoso$/i.test(scheme)) {
        return res.status(401).send({ error: "Token malformatted" });
    }
    jsonwebtoken_1.default.verify(token, "" + auth_1.default.secret_key, (err, decoded) => {
        if (err)
            return res.status(401).send({ error: "Token invalid" });
        // veridication -> token need to be unique to user
        return next();
    });
});
exports.default = authentication;
//# sourceMappingURL=auth.js.map