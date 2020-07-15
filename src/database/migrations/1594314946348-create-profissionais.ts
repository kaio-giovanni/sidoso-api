import {MigrationInterface, QueryRunner} from "typeorm";

export class createProfissionais1594314946348 implements MigrationInterface {
    name = 'createProfissionais1594314946348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `profissionais` ("+
        " `id` int NOT NULL AUTO_INCREMENT,"+
        " `is_active` tinyint NOT NULL DEFAULT '1',"+
        " `name` varchar(80) NOT NULL,"+
        " `birth` date NOT NULL,"+
        " `cpf` varchar(15) NOT NULL,"+
        " `genre` set ('M', 'F') NOT NULL DEFAULT 'M',"+
        " `phone_main` varchar(16) NOT NULL,"+
        " `phone_secondary` varchar(16) NULL,"+
        " `email` varchar(60) NOT NULL,"+
        " `password` varchar(80) NOT NULL,"+
        " `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),"+
        " `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),"+
        " `profissaoId` int NOT NULL,"+
        " UNIQUE INDEX `IDX_56fdd821f35e9c6da11d4e6690` (`cpf`),"+
        " UNIQUE INDEX `IDX_892d863fee8fd242da8736a25b` (`email`),"+
        " PRIMARY KEY (`id`)) ENGINE=InnoDB");
        
        await queryRunner.query("ALTER TABLE `profissionais`"+
        " ADD CONSTRAINT `FK_99bb8939eb471bde6b15063f6fd`"+
        " FOREIGN KEY (`profissaoId`)"+
        " REFERENCES `profissoes`(`id`)"+
        " ON DELETE NO ACTION ON UPDATE NO ACTION");

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `profissionais` DROP FOREIGN KEY `FK_99bb8939eb471bde6b15063f6fd`");
        await queryRunner.query("DROP INDEX `IDX_892d863fee8fd242da8736a25b` ON `profissionais`");
        await queryRunner.query("DROP INDEX `IDX_56fdd821f35e9c6da11d4e6690` ON `profissionais`");
        await queryRunner.query("DROP TABLE `profissionais`");

    }

}
