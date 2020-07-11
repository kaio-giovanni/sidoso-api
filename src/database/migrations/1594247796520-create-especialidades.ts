import {MigrationInterface, QueryRunner} from "typeorm";

export class createEspecialidades1594247796520 implements MigrationInterface {
    name = 'createEspecialidades1594247796520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `especialidades` ("+
        " `id` int NOT NULL AUTO_INCREMENT,"+
        " `name` varchar(80) NOT NULL,"+
        " `description` varchar(160) NOT NULL,"+
        " `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),"+
        " `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),"+
        " `profissaoId` int NOT NULL,"+ // profissao ao qual a especialidade esta ligada
        " PRIMARY KEY (`id`)) ENGINE=InnoDB");

        await queryRunner.query("ALTER TABLE `especialidades`"+
        " ADD CONSTRAINT `FK_c46784edd8445ec0afb1db9ad9e`"+
        " FOREIGN KEY (`profissaoId`)"+
        " REFERENCES `profissoes`(`id`)"+
        " ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `especialidades` DROP FOREIGN KEY `FK_c46784edd8445ec0afb1db9ad9e`");
        await queryRunner.query("DROP TABLE `especialidades`");
    }

}
