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
exports.AlterTables1720418554204 = void 0;
class AlterTables1720418554204 {
    constructor() {
        this.name = 'AlterTables1720418554204';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "UQ_771e73f89f2c8a481e0f1a8339e" UNIQUE ("department")`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_e97a7f3c48c04b54ffc24e5fc71" UNIQUE ("name")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_e97a7f3c48c04b54ffc24e5fc71"`);
            yield queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "UQ_771e73f89f2c8a481e0f1a8339e"`);
        });
    }
}
exports.AlterTables1720418554204 = AlterTables1720418554204;
//# sourceMappingURL=1720418554204-alter-tables.js.map