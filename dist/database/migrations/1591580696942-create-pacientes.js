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
exports.createPacientes1591580696942 = void 0;
class createPacientes1591580696942 {
    constructor() {
        this.name = 'createPacientes1591580696942';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("CREATE TABLE `pacientes` (`id` int NOT NULL AUTO_INCREMENT," +
                " `is_active` tinyint NOT NULL DEFAULT '1'," +
                " `name` varchar(80) NOT NULL," +
                " `birth` date NOT NULL," +
                " `cpf` varchar(15) NOT NULL," +
                " `genre` set ('M', 'F') NOT NULL DEFAULT 'M,F'," +
                " `phone_main` varchar(16) NOT NULL," +
                " `phone_secondary` varchar(16) NULL," +
                " `email` varchar(60) NOT NULL," +
                " `password` varchar(80) NOT NULL," +
                " `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
                " `update_at` timestamp NULL," +
                " UNIQUE INDEX `IDX_d6737b831d4e311678dfce056b` (`cpf`)," +
                " UNIQUE INDEX `IDX_9b1d1c80bdf7c29c7187ef8939` (`email`)," +
                " PRIMARY KEY (`id`)) ENGINE=InnoDB");
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("DROP INDEX `IDX_9b1d1c80bdf7c29c7187ef8939` ON `pacientes`");
            yield queryRunner.query("DROP INDEX `IDX_d6737b831d4e311678dfce056b` ON `pacientes`");
            yield queryRunner.query("DROP TABLE `pacientes`");
        });
    }
}
exports.createPacientes1591580696942 = createPacientes1591580696942;
//# sourceMappingURL=1591580696942-create-pacientes.js.map