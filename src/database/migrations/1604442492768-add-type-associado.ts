import {MigrationInterface, QueryRunner} from "typeorm";

export class addTypeAssociado1604442492768 implements MigrationInterface {
    name = 'addTypeAssociado1604442492768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `associados` ADD `type` varchar(120) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `associados` DROP COLUMN `type`");
    }

}
