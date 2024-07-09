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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const department_entity_1 = __importDefault(require("../entity/department.entity"));
const http_exceptions_1 = __importDefault(require("../exceptions/http.exceptions"));
class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.find();
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.findOneBy(id);
        });
    }
    createDepartment(department) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDepartment = new department_entity_1.default();
            newDepartment.department = department;
            return this.departmentRepository.save(newDepartment);
        });
    }
    updateDepartment(id, detailsToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentRepository.findOneBy(id);
            department.department = detailsToUpdate.department;
            return this.departmentRepository.save(department);
        });
    }
    deleteDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentRepository.findOneBy(id);
            if (department.employee.length) {
                throw new http_exceptions_1.default(403, "You can't delete department with employees in it.");
            }
            return yield this.departmentRepository.remove(department);
        });
    }
}
exports.default = DepartmentService;
//# sourceMappingURL=department.service.js.map