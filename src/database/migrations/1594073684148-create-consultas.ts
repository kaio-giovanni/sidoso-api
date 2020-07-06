import {MigrationInterface, QueryRunner} from "typeorm";

export class createConsultas1594073684148 implements MigrationInterface {
    name = 'createConsultas1594073684148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `consultas` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(120) NOT NULL, `photo_url` varchar(100) NULL, `date_c` datetime NOT NULL, `latitude` varchar(255) NOT NULL, `longitude` varchar(255) NOT NULL, `status` set ('MARCADA', 'CONCLUÍDA', 'CANCELADA') NOT NULL DEFAULT 'CANCELADA,CONCLUÍDA,MARCADA', `obs` text NULL, `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `profissionalId` int NOT NULL, `pacienteId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `consultas` ADD CONSTRAINT `FK_34f3d647c94d21b7bea78b161bd` FOREIGN KEY (`profissionalId`) REFERENCES `profissionais`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `consultas` ADD CONSTRAINT `FK_df1b87b9ce3ca8a55da58704bc9` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `consultas` DROP FOREIGN KEY `FK_df1b87b9ce3ca8a55da58704bc9`");
        await queryRunner.query("ALTER TABLE `consultas` DROP FOREIGN KEY `FK_34f3d647c94d21b7bea78b161bd`");
        await queryRunner.query("DROP TABLE `consultas`");
    }

}
