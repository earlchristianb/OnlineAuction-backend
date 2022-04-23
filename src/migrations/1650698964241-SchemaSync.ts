import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaSync1650698964241 implements MigrationInterface {
    name = 'SchemaSync1650698964241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction_item" RENAME COLUMN "id" TO "itemId"`);
        await queryRunner.query(`ALTER TABLE "auction_item" RENAME CONSTRAINT "PK_27c3c60778327d48b589190ab20" TO "PK_5be0457a800822a8e61d0afc1c8"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction_item" RENAME CONSTRAINT "PK_5be0457a800822a8e61d0afc1c8" TO "PK_27c3c60778327d48b589190ab20"`);
        await queryRunner.query(`ALTER TABLE "auction_item" RENAME COLUMN "itemId" TO "id"`);
    }

}

