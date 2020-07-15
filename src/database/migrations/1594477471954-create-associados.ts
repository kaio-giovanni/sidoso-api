import {MigrationInterface, QueryRunner} from "typeorm";

export class createAssociados1594477471954 implements MigrationInterface {
    name = 'createAssociados1594477471954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `associados` ("+
        " `id` int NOT NULL AUTO_INCREMENT,"+
        " `name` varchar(120) NOT NULL,"+
        " `is_active` tinyint NOT NULL DEFAULT '1',"+
        " `cnpj` varchar(20) NOT NULL,"+
        " `phone_main` varchar(16) NOT NULL,"+
        " `phone_secondary` varchar(16) NULL,"+
        " `email` varchar(60) NULL,"+
        " `latitude` varchar(80) NOT NULL,"+
        " `longitude` varchar(80) NOT NULL,"+
        " `logo` varchar(80) NULL,"+
        " `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),"+
        " `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),"+
        " UNIQUE INDEX `IDX_bf7051e1abac75e3d1941229d6` (`cnpj`),"+
        " UNIQUE INDEX `IDX_671234cce19ac30acf1d20dcfb` (`email`),"+
        " PRIMARY KEY (`id`)) ENGINE=InnoDB");
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_671234cce19ac30acf1d20dcfb` ON `associados`");
        await queryRunner.query("DROP INDEX `IDX_bf7051e1abac75e3d1941229d6` ON `associados`");
        await queryRunner.query("DROP TABLE `associados`");
    }

}
