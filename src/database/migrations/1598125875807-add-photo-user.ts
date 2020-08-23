import {MigrationInterface, QueryRunner} from "typeorm";

export class addPhotoUser1598125875807 implements MigrationInterface {
    name = 'addPhotoUser1598125875807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `profissionais` ADD `photo` varchar(80) NULL AFTER is_active");
        await queryRunner.query("ALTER TABLE `pacientes` ADD `photo` varchar(80) NULL AFTER is_active");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pacientes` DROP COLUMN `photo`");
        await queryRunner.query("ALTER TABLE `profissionais` DROP COLUMN `photo`");
    }

}
