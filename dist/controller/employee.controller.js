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
const express_1 = __importDefault(require("express"));
const http_exceptions_1 = __importDefault(require("../exceptions/http.exceptions"));
const class_transformer_1 = require("class-transformer");
const employee_dto_1 = require("../dto/employee.dto");
const class_validator_1 = require("class-validator");
class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
        this.getAllEmployees = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.employeeService.getAllEmployees();
                if (!employees) {
                    const error = new http_exceptions_1.default(404, `No Employees found`);
                    throw error;
                }
                res.status(200).send(employees);
            }
            catch (err) {
                next(err);
            }
        });
        this.getEmployeeById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield this.employeeService.getEmployeeById(Number(req.params.id));
                if (!employee) {
                    const error = new http_exceptions_1.default(404, `No Employee found with id: ${req.params.id}`);
                    throw error;
                }
                res.status(200).send(employee);
            }
            catch (err) {
                next(err);
            }
        });
        this.createEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeDto = (0, class_transformer_1.plainToInstance)(employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(employeeDto);
                if (errors.length) {
                    console.log(errors);
                    throw new http_exceptions_1.default(400, JSON.stringify(errors));
                }
                const employee = yield this.employeeService.createEmployee(employeeDto.name, employeeDto.email, employeeDto.age, employeeDto.address);
                res.status(201).send(employee);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.employeeService.deleteEmployee(Number(req.params.id));
                if (!result) {
                    const error = new http_exceptions_1.default(404, `No Employee found with id: ${req.params.id}`);
                    throw error;
                }
                console.log(result);
                res.status(204).send();
            }
            catch (err) {
                next(err);
            }
        });
        this.updateEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeService.updateEmployee(Number(req.params.id), req.body);
            res.status(200).send(employee);
        });
        this.router = express_1.default.Router();
        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeById);
        this.router.post("/", this.createEmployee);
        this.router.delete("/:id", this.deleteEmployee);
        this.router.put("/:id", this.updateEmployee);
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map