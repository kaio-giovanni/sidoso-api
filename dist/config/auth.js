"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role;
(function (Role) {
    Role["PACIENTE"] = "PACIENTE";
    Role["PROFISSIONAL"] = "PROFISSIONAL";
    Role["ADMIN"] = "ADMIN";
})(Role || (Role = {}));
exports.default = {
    secret_key: process.env.APP_KEY,
    expiresIn: "7d",
    role: Role
};
//# sourceMappingURL=auth.js.map