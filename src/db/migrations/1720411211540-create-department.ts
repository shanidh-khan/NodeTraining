import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDepartment1720411211540 implements MigrationInterface {
    name = 'CreateDepartment1720411211540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "department" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`DROP TABLE "department"`);
    }

}
