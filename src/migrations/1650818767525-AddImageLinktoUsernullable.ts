import {MigrationInterface, QueryRunner} from "typeorm";

export class AddImageLinktoUsernullable1650818767525 implements MigrationInterface {
    name = 'AddImageLinktoUsernullable1650818767525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "imageLink" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "imageLink"`);
    }

}
