
const os = require("os");

const {
    add,
    subtract,
    multiply,
    divide,
    average
} = require("./operations");

const formatResult = require("./formatter");

const operation = process.argv[2];
const numbers = process.argv.slice(3).map(Number);

try {
    if (!operation) {
        throw new Error("Please provide an operation.");
    }

    if (numbers.length === 0 || numbers.some(num => !Number.isFinite(num))) {
        throw new Error("Please provide valid numbers.");
    }

    let result;

    switch (operation) {
        case "add":
            if (numbers.length !== 2) throw new Error("Add requires 2 numbers.");
            result = add(numbers[0], numbers[1]);
            break;

        case "subtract":
            if (numbers.length !== 2) throw new Error("Subtract requires 2 numbers.");
            result = subtract(numbers[0], numbers[1]);
            break;

        case "multiply":
            if (numbers.length !== 2) throw new Error("Multiply requires 2 numbers.");
            result = multiply(numbers[0], numbers[1]);
            break;

        case "divide":
            if (numbers.length !== 2) throw new Error("Divide requires 2 numbers.");
            result = divide(numbers[0], numbers[1]);
            break;

        case "average":
            result = average(numbers);
            break;

        default:
            throw new Error("Unknown operation! Use add, subtract, multiply, divide, or average.");
    }

    console.log("===== MODULAR CALCULATOR =====");
    console.log(formatResult(operation, numbers, result));
    console.log("Operating System:", os.platform());

} catch (error) {
    console.log("Error:", error.message);
}
