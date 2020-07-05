import {MigrationInterface, QueryRunner} from "typeorm";

export class createProfissoes1593910782539 implements MigrationInterface {
    name = 'createProfissoes1593910782539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `profissoes` ("               +
        " `id` int NOT NULL AUTO_INCREMENT,"                                +
        " `name` varchar(80) NOT NULL,"                                     +
        " `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),"   +
        " `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),"   +
        " UNIQUE INDEX `IDX_61aa77ce643de8ca6a78f37929` (`name`),"          +
        " PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_61aa77ce643de8ca6a78f37929` ON `profissoes`");
        await queryRunner.query("DROP TABLE `profissoes`");
    }

}
