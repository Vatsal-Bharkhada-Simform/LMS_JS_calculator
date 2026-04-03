import { showError } from "../utils/errorHandlers.js";
import { evaluateBinaryOperators, evaluateUnaryOperators } from "./evaluationFunctions.js";
import { operators } from "./operatorReference.js";
import tokenizeExpression from "./tokenizeExpression.js";

function evaluate(str) {                                                                // Based on the Shunting yard algorithm
    let tokens;
    try {
        tokens = tokenizeExpression(str);                                               // Generate tokens
    } catch (err) {
        showError(err.message);
        return;
    }

    let hStack = [];
    let oStack = [];
    let result = [];
    let temp = "";

    for (let i = 0; i < tokens.length; i++) {                                           // Convert into Reverse Polish format.
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
        }
    }

    while (hStack.length !== 0) {
        oStack.push(hStack.pop());
    }

    for (let i = 0; i < oStack.length; i++) {                                           // Evaluate the reverse polish notation.
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

    if(result.length > 1) throw new SyntaxError("Invalid expression.");

    return result[0];
}

export { evaluate };