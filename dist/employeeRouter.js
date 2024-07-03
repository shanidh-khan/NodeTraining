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
const employees_1 = __importDefault(require("./employees"));
const data_source_1 = __importDefault(require("./data-source"));
const employeeRouter = express_1.default.Router();
employeeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.url);
    const employeeRepository = data_source_1.default.getRepository(employees_1.default);
    const employees = yield employeeRepository.find();
    res.status(200).send(employees);
}));
employeeRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.url);
    const employeeRepository = data_source_1.default.getRepository(employees_1.default);
    const employees = yield employeeRepository.findOneBy({
        id: Number(req.params.id),
    });
    res.status(200).send(employees);
}));
employeeRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.url);
    console.log(req.body);
    const employeeRepository = data_source_1.default.getRepository(employees_1.default);
    const newEmployee = new employees_1.default();
    newEmployee.email = req.body.email;
    newEmployee.name = req.body.name;
    const savedEmployee = yield employeeRepository.save(newEmployee);
    res.status(201).send("Created an employee");
}));
employeeRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.url);
    const employeeRepository = data_source_1.default.getRepository(employees_1.default);
    const employee = yield employeeRepository.findOneBy({
        id: Number(req.params.id),
    });
    employee.name = req.body.name;
    employee.email = req.body.email;
    const savedEmployee = yield employeeRepository.save(employee);
    res.status(200).send("Updated an employee");
}));
employeeRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.url);
    const employeeRepository = data_source_1.default.getRepository(employees_1.default);
    const result = yield employeeRepository.softDelete({
        id: Number(req.params.id),
    });
    res.status(204).send("Deleted an employee");
}));
employeeRouter.delete("/employees", (req, res) => {
    console.log(req.url);
    res.status(204).send("Deleted all employee");
});
exports.default = employeeRouter;
//# sourceMappingURL=employeeRouter.js.map