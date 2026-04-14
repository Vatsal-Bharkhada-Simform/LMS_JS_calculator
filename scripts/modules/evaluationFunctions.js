function evaluateUnaryOperators(op, a) {
    switch (op) {
        case "UM": return (a === "UM") ? 1 : a * -1;
        case "√": return Math.sqrt(a);
        case "³√": return Math.cbrt(a);
        case "log": return Math.log10(a);
        case "ln": return Math.log(a);
        case "sin": return Math.sin(a);
        case "cos": return Math.cos(a);
        case "tan": return Math.tan(a);
        case "asin": return Math.asin(a);
        case "acos": return Math.acos(a);
        case "atan": return Math.atan(a);
        case "|": return Math.abs(a);
        case "round": return Math.round(a);
        case "floor": return Math.floor(a);
        case "ceil": return Math.ceil(a);
        case "!": return factorial(a);
        default:
            throw new Error("Unknown operator encountered");
    }
}

function evaluateBinaryOperators(op, b, a) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
        case "^": return a ** b;
        case "%": return a % b;
        default:
            throw new Error("Unknown operator encountered");
    }
}

function factorial(n) {
    let ans = 1;
    for (let i = Math.abs(n); i > 0; --i) ans *= i;
    return n > 0 ? ans : -1*ans;
}

export {evaluateUnaryOperators, evaluateBinaryOperators};