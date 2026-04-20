import calculator from "../modules/calculator.js";
import { operators, parenthesis } from "../modules/operatorReference.js";
import { updateDisplay } from "./displayHandlers.js";
import { showError } from "./errorHandlers.js";

function validateInput(curr, str) {
    // If display has answer and operator is inserted continue the expression else restart new expression.
    if (calculator.displayHasAnswer) {
        calculator.displayHasAnswer = false;
        if (!operators[str]) {
            return str;
        }
    }

    if(curr.at(-1) ==="(" && operators[str]?.operands === 2){
        showError("Cannot insert binary operator here");
        return curr;
    } 
    else if (!isNaN(curr.at(-1)) && str === "("){
        return curr + "*" + str;
    }
    else if (!isNaN(str) && curr.at(-1) === ")"){
        return curr + "*" + str;
    }

    // Prevent multiple consecutive decimals and operators 
    if (str === "." && curr.at(-1) === ".") return false;
    if (!(parenthesis.includes(str)) && (operators[curr.at(-1)]?.precedence && operators[str]?.precedence)) {
        console.log("here");
        return curr.slice(0, -1) + str;
    }

    return curr + str;
}

function wrapLastElement(str, prefix, suffix) {
    let [, i] = getLastElement(str);

    if (prefix) {
        str = str.slice(0, i) + prefix + str.slice(i);
    }
    if (suffix) {
        str = str + suffix;
    }

    return str;
}

function getLastElement(str) {
    if(str.at(-1) === "("){
        showError("Incomplete expression");
        return;
    }

    let parenthesisIndex = str.at(-1) === ")" ? 1 : 0;
    let i = parenthesisIndex ? str.length - 2 : str.length - 1;
    let num = parenthesisIndex ? ")" : "";

    if (parenthesisIndex) {
        while (i >= 0) {
            if (str[i] === ")") ++parenthesisIndex;
            else if (str[i] === "(") --parenthesisIndex;
            num = str[i] + num;
            i--;
            if (parenthesisIndex === 0) break;
        }
        if(parenthesisIndex !== 0) {
            showError("Invalid parenthesis");
            return;
        }
    } 
    else {
        while (i >= 0 && (str[i] >= "0" && str[i] <= "9") || str[i] === ".") {
            num = str[i] + num;
            i--;
        }
    }

    if (str[i] === "-") {
        if (i > 0 && (str[i - 1] === "(" || operators[str[i - 1]]?.precedence)) {
            num = str[i] + num;
            i--;
        } else if (i === 0){
            num = str[i] + num;
            i--;
        }
    }
    else if(i >= 0 && isNaN(str[i]) && !operators[str[i]]){
        let op = "";
        while(i >= 0 && isNaN(str[i]) && !operators[str[i]]){
            op = str[i] + op;
            i--;
        }
        num = op + num;
    }
    else if (i >= 0 && operators[str[i]]?.operands === 1){
        num = str[i] + num;
        i--;
    }

    i = i < 0 ? 0 : i+1;

    return [num, i];
}

export { wrapLastElement, getLastElement, validateInput };