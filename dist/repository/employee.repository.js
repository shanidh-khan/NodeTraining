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
class EmployeeRepository {
    constructor(repository) {
        this.repository = repository;
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = this.repository;
            return employeeRepository.find({ relations: ["address"] });
        });
    }
    findOneBy(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = this.repository;
            return employeeRepository.findOne({
                where: filter,
                relations: ["address"],
            });
        });
    }
    save(newEmployee) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = this.repository;
            return employeeRepository.save(newEmployee);
        });
    }
    delete(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = this.repository;
            return yield employeeRepository.softDelete(employee);
        });
    }
    remove(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = this.repository;
            return yield employeeRepository.softRemove(employee);
        });
    }
}
exports.default = EmployeeRepository;
//# sourceMappingURL=employee.repository.js.map