import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTables1720418554204 implements MigrationInterface {
    name = 'AlterTables1720418554204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "UQ_771e73f89f2c8a481e0f1a8339e" UNIQUE ("department")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_e97a7f3c48c04b54ffc24e5fc71" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_e97a7f3c48c04b54ffc24e5fc71"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "UQ_771e73f89f2c8a481e0f1a8339e"`);
    }

}
