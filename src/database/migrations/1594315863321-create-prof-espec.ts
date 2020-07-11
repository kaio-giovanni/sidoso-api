import {MigrationInterface, QueryRunner} from "typeorm";

export class createProfEspec1594315863321 implements MigrationInterface {
    name = 'createProfEspec1594315863321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `prof_especialidade` ("+
        " `id` int NOT NULL AUTO_INCREMENT,"+
        " `profissionalId` int NOT NULL,"+
        " `especialidadeId` int NOT NULL,"+
        " PRIMARY KEY (`id`)) ENGINE=InnoDB");

        await queryRunner.query("ALTER TABLE `prof_especialidade`"+
        " ADD CONSTRAINT `FK_e4021e2cef6f4e05d8153df094d`"+
        " FOREIGN KEY (`profissionalId`)"+
        " REFERENCES `profissionais`(`id`)"+
        " ON DELETE NO ACTION ON UPDATE NO ACTION");

        await queryRunner.query("ALTER TABLE `prof_especialidade`"+
        " ADD CONSTRAINT `FK_05531ced0eb9a99e426273ed0c4`"+
        " FOREIGN KEY (`especialidadeId`)"+
        " REFERENCES `especialidades`(`id`)"+
        " ON DELETE NO ACTION ON UPDATE NO ACTION");

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `prof_especialidade` DROP FOREIGN KEY `FK_05531ced0eb9a99e426273ed0c4`");
        await queryRunner.query("ALTER TABLE `prof_especialidade` DROP FOREIGN KEY `FK_e4021e2cef6f4e05d8153df094d`");
        await queryRunner.query("DROP TABLE `prof_especialidade`");
        
    }

}
