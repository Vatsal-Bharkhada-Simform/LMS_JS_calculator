function evaluateUnaryOperators(op, a) {
    switch (op) {
        case "UM": return (a === "UM") ? 1 : a * -1;
        case "√": return Math.sqrt(a);
        case "log": return Math.log10(a);
        case "ln": return Math.log(a);
        case "|": return Math.abs(a);
        case "!": return factorial(a);
        case "⌉": return a;
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
    }
}

function factorial(n) {
    let ans = 1;
    for (let i = n; i > 0; --i) ans *= i;
    return ans;
}

export {evaluateUnaryOperators, evaluateBinaryOperators};