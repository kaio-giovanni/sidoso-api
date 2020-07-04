"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenJwt = void 0;
var auth_1 = __importDefault(require("../config/auth"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Role;
(function (Role) {
    Role["PACIENTE"] = "PACIENTE";
    Role["PROFISSIONAL"] = "PROFISSIONAL";
    Role["ADMIN"] = "ADMIN";
})(Role || (Role = {}));
var TokenJwt = /** @class */ (function () {
    function TokenJwt() {
    }
    TokenJwt.generateToken = function (id, email, role) {
        var token = jsonwebtoken_1.default.sign({
            userId: id,
            email: email,
            role: role
        }, "" + auth_1.default.secret_key, {
            expiresIn: auth_1.default.expiresIn
        });
        return this.prefix + token;
    };
    TokenJwt.decodedToken = function (token) {
        var value = { success: false, body: {} };
        jsonwebtoken_1.default.verify(token, "" + auth_1.default.secret_key, function (err, decoded) {
            if (err) {
                value = { success: false, body: err };
            }
            else {
                value = { success: true, body: { decoded: decoded } };
            }
        });
        return value;
    };
    // usado depois do middleware de auth, para verificar userRole === decodedRole
    TokenJwt.verifyRole = function (authorization, role) {
        // header authorization  
        // authorization format: prefix + token + decodedRole
        var value = { success: false, body: {} };
        if (authorization === undefined || authorization === null) {
            value = { success: false, body: {
                    error: "Authentication failed",
                    message: "Authorization header not found"
                } };
            return value;
        }
        var splitAuth = authorization.split(" ");
        if (!(splitAuth.length === 3)) {
            value = { success: false, body: {
                    error: "Authentication failed",
                    message: "Authorization header malformatted"
                } };
            return value;
        }
        var prefix = splitAuth[0], token = splitAuth[1], decodedRole = splitAuth[2];
        if (decodedRole !== role) {
            value = { success: false, body: {
                    error: "Permission not granted",
                    message: "Access denied ! unsupported role"
                } };
            return value;
        }
        value = { success: true, body: {
                userToken: this.prefix + token
            } };
        return value;
    };
    TokenJwt.prefix = "sidoso ";
    TokenJwt.role = Role;
    return TokenJwt;
}());
exports.TokenJwt = TokenJwt;
//# sourceMappingURL=TokenJwt.js.map