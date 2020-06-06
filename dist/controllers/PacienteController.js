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
Object.defineProperty(exports, "__esModule", { value: true });
class Paciente {
    // get pacientes
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const paciente = {
                name: 'Francisco',
                birth: '10/10/2000',
                cpf: '000.000.000-00',
                genrer: 'Masculino',
                phone_main: '(000) 00000-0000',
                phone_secondary: '(000) 00000-0000',
                email: 'francisco@gmail.com',
                password: 'AKCBSLILEKJLSLKCLKSAJLKDSA'
            };
            return res.json(paciente);
        });
    }
    // create a new paciente
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    // update a paciente
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    // delete a paciente
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = Paciente;
//# sourceMappingURL=PacienteController.js.map