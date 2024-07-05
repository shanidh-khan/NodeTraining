"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FizzBuzz {
    fizzBuzz(num) {
        if (num % 3 == 0 && num % 5 == 0)
            return "FizzBuzz";
        if (num % 3 == 0) {
            return "Fizz";
        }
        if (num % 5 == 0)
            return "Buzz";
        return num;
    }
    divisibleByThree(num) {
        return num % 3 == 0;
    }
}
const fizzBuzz = new FizzBuzz();
for (let i = 0; i < 100; i++) {
    console.log(fizzBuzz.fizzBuzz(i));
}
exports.default = FizzBuzz;
//# sourceMappingURL=fizzBuzz.util.js.map