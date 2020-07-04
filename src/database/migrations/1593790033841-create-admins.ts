import {MigrationInterface, QueryRunner} from "typeorm";

export class createAdmins1593790033841 implements MigrationInterface {
    name = 'createAdmins1593790033841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `administrator` ("            +
        " `id` int NOT NULL AUTO_INCREMENT,"                                +
        " `name` varchar(80) NOT NULL,"                                     +
        " `birth` date NOT NULL,"                                           +
        " `cpf` varchar(15) NOT NULL,"                                      +
        " `email` varchar(60) NOT NULL,"                                    +
        " `password` varchar(80) NOT NULL,"                                 +
        " `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),"   +
        " `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),"   +
        " UNIQUE INDEX `IDX_3a6bce843d2e26412af70c00f0` (`cpf`),"           +
        " UNIQUE INDEX `IDX_be0ce9bef56d5a30b9e5752564` (`email`),"         +
        " PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_be0ce9bef56d5a30b9e5752564` ON `administrator`");
        await queryRunner.query("DROP INDEX `IDX_3a6bce843d2e26412af70c00f0` ON `administrator`");
        await queryRunner.query("DROP TABLE `administrator`");
    }

}
