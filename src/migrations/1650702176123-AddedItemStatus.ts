import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedItemStatus1650702176123 implements MigrationInterface {
    name = 'AddedItemStatus1650702176123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction_item" DROP CONSTRAINT "PK_27c3c60778327d48b589190ab20"`);
        await queryRunner.query(`ALTER TABLE "auction_item" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "auction_item" ADD "itemId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "auction_item" ADD CONSTRAINT "PK_5be0457a800822a8e61d0afc1c8" PRIMARY KEY ("itemId")`);
        await queryRunner.query(`ALTER TABLE "auction_item" ADD "status" character varying NOT NULL DEFAULT 'Storage'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction_item" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "auction_item" DROP CONSTRAINT "PK_5be0457a800822a8e61d0afc1c8"`);
        await queryRunner.query(`ALTER TABLE "auction_item" DROP COLUMN "itemId"`);
        await queryRunner.query(`ALTER TABLE "auction_item" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "auction_item" ADD CONSTRAINT "PK_27c3c60778327d48b589190ab20" PRIMARY KEY ("id")`);
    }

}
