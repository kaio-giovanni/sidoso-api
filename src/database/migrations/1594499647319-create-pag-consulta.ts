import {MigrationInterface, QueryRunner} from "typeorm";

export class createPagConsulta1594499647319 implements MigrationInterface {
    name = 'createPagConsulta1594499647319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `pagamento_consultas` ("+
        " `id` int NOT NULL AUTO_INCREMENT,"+
        " `price` decimal NOT NULL,"+
        " `pay_value` decimal NOT NULL,"+
        " `discount` decimal NULL,"+
        " `status` set ('001', '002', '003', '004') NOT NULL DEFAULT '003',"+
        " `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),"+
        " `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),"+
        " `consultaId` int NOT NULL,"+
        " PRIMARY KEY (`id`)) ENGINE=InnoDB");

        await queryRunner.query("ALTER TABLE `pagamento_consultas`"+
        " ADD CONSTRAINT `FK_c613635303253447ddeb7c0daa0`"+
        " FOREIGN KEY (`consultaId`)"+
        " REFERENCES `consultas`(`id`)"+
        " ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pagamento_consultas` DROP FOREIGN KEY `FK_c613635303253447ddeb7c0daa0`");
        await queryRunner.query("DROP TABLE `pagamento_consultas`");
    }

}
