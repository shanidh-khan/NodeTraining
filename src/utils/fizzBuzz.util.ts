class FizzBuzz {
	public fizzBuzz(num) {
		if (num % 3 == 0 && num % 5 == 0) return "FizzBuzz";
		if (num % 3 == 0) {
			return "Fizz";
		}
		if (num % 5 == 0) return "Buzz";
		return num;
	}

	divisibleByThree(num): boolean {
		return num % 3 == 0;
	}
}

const fizzBuzz = new FizzBuzz();

for (let i = 0; i < 100; i++) {
	console.log(fizzBuzz.fizzBuzz(i));
}

export default FizzBuzz;
