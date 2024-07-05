// import FizzBuzz from "../../src/utils/fizzBuzz.util";
// describe("fizzBuzz test", () => {
// 	it(`should return "Fizz"for numbers divisible by 3`, () => {
// 		const fizzBuzz = new FizzBuzz();
// 		expect(fizzBuzz.fizzBuzz(3)).toBe("Fizz");
// 		expect(fizzBuzz.fizzBuzz(6)).toBe("Fizz");
// 	});
// 	it(`should return "Buzz"for numbers divisible by 5`, () => {
// 		const fizzBuzz = new FizzBuzz();
// 		expect(fizzBuzz.fizzBuzz(5)).toBe("Buzz");
// 		expect(fizzBuzz.fizzBuzz(10)).toBe("Buzz");
// 	});
// 	it(`should return "FizzBuzz"for numbers divisible by 15`, () => {
// 		const fizzBuzz = new FizzBuzz();
// 		expect(fizzBuzz.fizzBuzz(15)).toBe("FizzBuzz");
// 		expect(fizzBuzz.fizzBuzz(30)).toBe("FizzBuzz");
// 	});
// 	it("using mocks", () => {
// 		const fizzBuzz = new FizzBuzz();
// 		let mockFn = jest.fn(fizzBuzz.divisibleByThree).mockReturnValue(true);
// 		expect(fizzBuzz.fizzBuzz(4)).toBe("Fizz");
// 		expect(mockFn).toHaveBeenCalledTimes(2);
// 	});
// 	it("using spy", () => {
// 		const fizzBuzz = new FizzBuzz();
// 		const spy = jest.spyOn(fizzBuzz, `divisibleByThree`);
// 		expect(fizzBuzz.fizzBuzz(4)).toBe(4);
// 		expect(spy).toHaveBeenCalledTimes(2);
// 		spy.mockRestore();
// 	});
// });
//# sourceMappingURL=fizzBuzz.util.test.js.map