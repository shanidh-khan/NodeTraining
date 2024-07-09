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
const address_entity_1 = __importDefault(require("../entity/address.entity"));
const employee_entity_1 = __importDefault(require("../entity/employee.entity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
const http_exceptions_1 = __importDefault(require("../exceptions/http.exceptions"));
class EmployeeService {
    constructor(employeeRepository, departmentRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.find();
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findOneBy({ id });
        });
    }
    createEmployee(name, email, age, address, password, role, department) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = new employee_entity_1.default();
            newEmployee.email = email;
            newEmployee.name = name;
            newEmployee.age = age;
            newEmployee.password = password ? yield bcrypt_1.default.hash(password, 10) : "";
            newEmployee.role = role;
            const newAddress = new address_entity_1.default();
            newAddress.line1 = address.line1;
            newAddress.pincode = address.pincode;
            newEmployee.address = newAddress;
            const newDepartment = yield this.departmentRepository.findOne(department);
            if (newDepartment) {
                newEmployee.department = newDepartment;
                return this.employeeRepository.save(newEmployee);
            }
            else {
                throw new http_exceptions_1.default(404, "Department Not Found");
            }
        });
    }
    updateEmployee(id, detailsToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const employee = yield this.employeeRepository.findOneBy({ id });
            employee.name = detailsToUpdate === null || detailsToUpdate === void 0 ? void 0 : detailsToUpdate.name;
            employee.email = detailsToUpdate === null || detailsToUpdate === void 0 ? void 0 : detailsToUpdate.email;
            employee.age = detailsToUpdate === null || detailsToUpdate === void 0 ? void 0 : detailsToUpdate.age;
            employee.address.line1 = (_a = detailsToUpdate.address) === null || _a === void 0 ? void 0 : _a.line1;
            employee.address.pincode = (_b = detailsToUpdate.address) === null || _b === void 0 ? void 0 : _b.pincode;
            employee.role = detailsToUpdate === null || detailsToUpdate === void 0 ? void 0 : detailsToUpdate.role;
            const newDepartment = yield this.departmentRepository.findOne(detailsToUpdate.department);
            if (detailsToUpdate.department) {
                if (newDepartment) {
                    employee.department = newDepartment;
                    return this.employeeRepository.save(employee);
                }
                else {
                    throw new http_exceptions_1.default(403, "You are not authorized to create employee");
                }
            }
            return this.employeeRepository.save(employee);
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findOneBy({ id });
            return yield this.employeeRepository.remove(employee);
        });
    }
    loginEmployee(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield this.employeeRepository.findOneBy({ email });
                if (!employee) {
                    throw new Error();
                }
                const result = yield bcrypt_1.default.compare(password, employee.password);
                if (!result) {
                    throw new Error();
                }
                const payload = {
                    name: employee.name,
                    email: employee.email,
                    role: employee.role,
                };
                const token = jsonwebtoken_1.default.sign(payload, constants_1.JWT_TOKEN, {
                    expiresIn: constants_1.JWT_VALIDITY,
                });
                return { token };
            }
            catch (error) { }
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map