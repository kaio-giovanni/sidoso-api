import {MigrationInterface, QueryRunner} from "typeorm";

export class createPacientes1591764264243 implements MigrationInterface {
    name = 'createPacientes1591764264243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `pacientes`" + 
        " (`id` int NOT NULL AUTO_INCREMENT," + 
        " `is_active` tinyint NOT NULL DEFAULT '1'," + 
        " `name` varchar(80) NOT NULL," + 
        " `birth` date NOT NULL," + 
        " `cpf` varchar(15) NOT NULL," + 
        " `genre` set ('M', 'F') NOT NULL DEFAULT 'M'," + 
        " `phone_main` varchar(16) NOT NULL," + 
        " `phone_secondary` varchar(16) NULL," + 
        " `email` varchar(60) NOT NULL," + 
        " `password` varchar(80) NOT NULL," + 
        " `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)," + 
        " `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)," + 
        " UNIQUE INDEX `IDX_d6737b831d4e311678dfce056b` (`cpf`)," + 
        " UNIQUE INDEX `IDX_9b1d1c80bdf7c29c7187ef8939` (`email`)," + 
        " PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_9b1d1c80bdf7c29c7187ef8939` ON `pacientes`");
        await queryRunner.query("DROP INDEX `IDX_d6737b831d4e311678dfce056b` ON `pacientes`");
        await queryRunner.query("DROP TABLE `pacientes`");
    }

}
