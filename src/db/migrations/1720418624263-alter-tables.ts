import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTables1720418624263 implements MigrationInterface {
    name = 'AlterTables1720418624263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "UQ_771e73f89f2c8a481e0f1a8339e" UNIQUE ("department")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_817d1d427138772d47eca048855"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "UQ_771e73f89f2c8a481e0f1a8339e"`);
    }

}
