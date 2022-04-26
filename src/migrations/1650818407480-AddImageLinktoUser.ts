import {MigrationInterface, QueryRunner} from "typeorm";

export class AddImageLinktoUser1650818407480 implements MigrationInterface {
    name = 'AddImageLinktoUser1650818407480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "imageLink" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "imageLink"`);
    }

}
