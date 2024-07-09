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
const authorization_middleware_1 = __importDefault(require("../middleware/authorization.middleware"));
const role_enum_1 = __importDefault(require("../utils/role.enum"));
class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
        this.getAllDepartments = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.role;
                if (role != role_enum_1.default.HR) {
                    throw new http_exceptions_1.default(403, "You are not authorized.");
                }
                const departments = yield this.departmentService.getAllDepartments();
                if (!departments.length) {
                    const error = new http_exceptions_1.default(404, `No Department found`);
                    throw error;
                }
                res.status(200).send(departments);
            }
            catch (err) {
                next(err);
            }
        });
        this.getDepartmentById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.role;
                if (role != role_enum_1.default.HR) {
                    throw new http_exceptions_1.default(403, "You are not authorized.");
                }
                const department = yield this.departmentService.getDepartmentById(Number(req.params.id));
                if (!department) {
                    const error = new http_exceptions_1.default(404, `No Department found with id: ${req.params.id}`);
                    throw error;
                }
                res.status(200).send(department);
            }
            catch (err) {
                next(err);
            }
        });
        this.createDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.role;
                if (role != role_enum_1.default.HR) {
                    throw new http_exceptions_1.default(403, "You are not authorized.");
                }
                const department = yield this.departmentService.createDepartment(req.body.department);
                res.status(201).send(department);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.role;
                if (role != role_enum_1.default.HR) {
                    throw new http_exceptions_1.default(403, "You are not authorized.");
                }
                const result = yield this.departmentService.deleteDepartment(Number(req.params.id));
                console.log(result);
                res.status(204).send();
            }
            catch (err) {
                next(err);
            }
        });
        this.updateDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.role;
                if (role != role_enum_1.default.HR) {
                    throw new http_exceptions_1.default(403, "You are not authorized.");
                }
                const department = yield this.departmentService.updateDepartment(Number(req.params.id), req.body);
                res.status(200).send(department);
            }
            catch (error) {
                next(error);
            }
        });
        this.router = express_1.default.Router();
        this.router.get("/", authorization_middleware_1.default, this.getAllDepartments);
        this.router.get("/:id", authorization_middleware_1.default, this.getDepartmentById);
        this.router.post("/", authorization_middleware_1.default, this.createDepartment);
        this.router.delete("/:id", authorization_middleware_1.default, this.deleteDepartment);
        this.router.put("/:id", authorization_middleware_1.default, this.updateDepartment);
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department.controller.js.map