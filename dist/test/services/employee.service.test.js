"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// describe("Employee Service", () => {
// 	let employeeRepository: EmployeeRepository;
// 	let employeeService: EmployeeService;
// 	beforeAll(() => {
// 		const dataSource = {
// 			getRepository: jest.fn(),
// 		};
// 		employeeRepository = new EmployeeRepository(
// 			dataSource.getRepository(Employee)
// 		);
// 		employeeService = new EmployeeService(employeeRepository,departmentRepository);
// 	});
// 	it("should return allEmployee", async () => {
// 		const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
// 		employeeRepository.find = mock;
// 		const users = await employeeService.getAllEmployees();
// 		expect(users).toEqual([]);
// 		expect(mock).toHaveBeenCalledTimes(1);
// 	});
// 	it("should return one employee", async () => {
// 		const mock = jest.fn();
// 		when(mock)
// 			.calledWith({ id: 1 })
// 			.mockResolvedValue({
// 				id: 1,
// 				email: "shanidh@gmail.com",
// 				name: "shaNJSKJKSnidh",
// 				age: 24,
// 				password:
// 					"$2b$10$xucrRiWeILExestUPTlzeu3DhQE/.03sRi6g/jG9qWBV6ZCJg1Cva",
// 				role: `UX`,
// 				address: {
// 					id: 1,
// 					deletedAt: null,
// 					line1: "jhdjhjkjfdjdsh",
// 					pincode: "jhjhdjjkjkkj",
// 					employee: new Employee(),
// 					createdAt: undefined,
// 					updatedAt: undefined,
// 				},
// 			});
// 		employeeRepository.findOneBy = mock;
// 		const users = await employeeService.getEmployeeById(1);
// 		expect(users.name).toEqual("shaNJSKJKSnidh");
// 		expect(mock).toHaveBeenCalledTimes(1);
// 	});
// 	it("should throw exception", async () => {
// 		const mockedFunction = jest.fn();
// 		when(mockedFunction).mockResolvedValue(null);
// 		employeeRepository.findOneBy = mockedFunction;
// 		await expect(
// 			employeeService.loginEmployee("nonexistent@example.com", "password")
// 		).rejects.toThrow(HttpException);
// 	});
// });
//# sourceMappingURL=employee.service.test.js.map