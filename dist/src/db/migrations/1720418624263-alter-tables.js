"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTables1720418624263 = void 0;
class AlterTables1720418624263 {
    constructor() {
        this.name = 'AlterTables1720418624263';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "UQ_771e73f89f2c8a481e0f1a8339e" UNIQUE ("department")`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_817d1d427138772d47eca048855"`);
            yield queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "UQ_771e73f89f2c8a481e0f1a8339e"`);
        });
    }
}
exports.AlterTables1720418624263 = AlterTables1720418624263;
//# sourceMappingURL=1720418624263-alter-tables.js.map