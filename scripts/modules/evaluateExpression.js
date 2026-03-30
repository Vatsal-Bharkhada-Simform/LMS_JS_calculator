import { showError } from "../utils/errorHandlers.js";
import { operators, constants } from "./operatorReference.js";

function evaluateUnaryOperators(op, a) {
    switch (op) {
        case "UM": return (a === "UM") ? 1 : a * -1;
        case "√": return Math.sqrt(a);
        case "log": return Math.log10(a);
        case "ln": return Math.log(a);
        case "⌈": return Math.ceil(a);
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
    }
}

function factorial(n) {
    let ans = 1;
    for (let i = n; i > 0; --i) ans *= i;
    return ans;
}

// let str = "134+25*log(6*ln(2))/2+3*5";

function evaluate(str) {
    let tokens;
    try {
        tokens = tokenizeExpression(str);
    } catch (err) {
        showError(err.message);
        console.log(err);
        return;
    }

    console.log(tokens);

    let hStack = [];
    let oStack = [];
    let result = [];
    let temp = "";

    for (let i = 0; i < tokens.length; i++) {
        if (!isNaN(Number(tokens[i]))) {
            oStack.push(Number(tokens[i]));
        } else if (tokens[i] === "(") {
            hStack.push(tokens[i]);
        } else if (tokens[i] === ")") {
            while (hStack.length && hStack.at(-1) !== "(") {
                oStack.push(hStack.pop());
            }
            hStack.pop();
        }
        else if (operators[tokens[i]] !== undefined) {
            while (hStack.length && operators[hStack.at(-1)].precedence >= operators[tokens[i]].precedence) {
                temp = hStack.pop();
                oStack.push(temp);
            }
            hStack.push(tokens[i]);
        } else {
            throw new Error("Invalid expression");
        }
    }

    while (hStack.length !== 0) {
        oStack.push(hStack.pop());
    }

    console.log(oStack);
    console.log(hStack);

    for (let i = 0; i < oStack.length; i++) {
        if (!isNaN(Number(oStack[i]))) result.push(oStack[i]);
        else {
            if (operators[oStack[i]].operands === 2) {
                temp = evaluateBinaryOperators(oStack[i], result.pop(), result.pop());
                result.push(temp);
            } else {
                temp = evaluateUnaryOperators(oStack[i], result.pop());
                result.push(temp);
            }
        }
    }
    return result[0];
}

function tokenizeExpression(str) {
    console.log(str);
    let parenthesisIndex = 0;
    let moduloIndex = 0;
    let ceilIndex = 0;
    let curr = "";
    let tokens = [];

    for (let i = 0; i < str.length; i++) {
        console.log(tokens);
        if (str[i] === ".") {                                                   //Add decimal without checks
            curr += str[i];
        }
        else if (str[i] === "-" && curr === "" && (i === 0 || operators[tokens.at(-1)] !== undefined || str[i - 1] === "|" || str[i - 1] === "⌈")) {
            tokens.push("UM");                                                  //Unary minus operator
        }
        else if (constants[str[i]] !== undefined) {
            tokens.push(constants[str[i]]);
        }
        else if (!isNaN(Number(str[i]))) {
            curr += str[i];                                                     // If a number encountered collect it in curr variable
        }
        else if (operators[str[i]] !== undefined) {                             // If operator is encountered check for 
            if (curr !== "") {                                                  // non-empty curr and aliases and add them to tokens array.
                tokens.push(curr);
                curr = "";
            }
            tokens.push(str[i]);
        } else if (str[i] === 'l') {                                            // Check for identifiers starting with l for log or ln.
            if (curr !== "") {
                tokens.push(curr);
                curr = "";
            }
            if (str.slice(i, i + 2).toLowerCase() === "ln") {
                tokens.push("ln");
                i++;
            } else if (str.slice(i, i + 3).toLowerCase() === "log") {
                tokens.push("log");
                i += 2;
            } else {
                throw new SyntaxError("Invalid expression.");
            }
        }
        else {
            throw new SyntaxError("Invalid expression.");
        }

        if (str[i] === '(') ++parenthesisIndex;
        else if (str[i] === ')') --parenthesisIndex;
        else if (str[i] === '⌈') ++ceilIndex;
        else if (str[i] === '⌉') --ceilIndex;
        else if (str[i] === '|') moduloIndex === 0 ? 1 : 0;
    }

    if (curr !== "") tokens.push(curr);
    if (parenthesisIndex !== 0 || moduloIndex !== 0 || ceilIndex !== 0) {
        throw new SyntaxError("Invalid parenthesis.");
    }

    console.log("\nTokens: ", tokens, "\n\n");

    return tokens;
}

export { evaluate };