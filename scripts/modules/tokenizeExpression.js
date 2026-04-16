import { constants, operators } from "./operatorReference.js";

function tokenizeExpression(str) {
    let parenthesisIndex = 0;
    let moduloIndex = 0;
    let curr = "";
    let tokens = [];

    for (let i = 0; i < str.length; i++) {
        if ((str[i] === "-" || str[i] === "+" || str[i] === "!") && curr === "" && (i === 0 || operators[tokens.at(-1)].precedence !== undefined || str[i - 1] === "|")) {
            if(str[i] === "!"){
                throw new SyntaxError("Wrong placement of factorial");
            }
            tokens.push(str[i] === '-' ? "UM" : "UP");                          // Unary minus operator
        }
        else if (operators[str[i]] !== undefined) {                             // If operator is encountered check for 
            if (curr !== "") {                                                  // non-empty curr and aliases and add them to tokens array.
                tokens.push(curr);
                curr = "";
            }
            tokens.push(str[i]);
        } 
        else if (!isNaN(Number(str[i])) || str[i] === ".") {
            curr += str[i];                                                     // If a number encountered collect it in curr variable
        }
        else if (constants[str[i]] !== undefined) {                             // Replace constants with original values
            if (curr !== "") {                                                  // non-empty curr and aliases and add them to tokens array.
                tokens.push(curr);
                curr = "";
            }
            tokens.push(constants[str[i]]);
        }
        else if (str[i] === 'l') {                                              // Check for identifiers starting with l for log or ln.
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
                throw new SyntaxError("Invalid expression");
            }
        }
        else {       
            throw new SyntaxError("Invalid expression");
        }

        if (str[i] === '(') ++parenthesisIndex;
        else if (str[i] === ')') --parenthesisIndex;
        else if (str[i] === '|') moduloIndex = (moduloIndex === 0) ? 1 : 0;
    }

    if (curr !== "") tokens.push(curr);

    if (parenthesisIndex || moduloIndex) {                                    // Throw error for uneven parenthesis pairs.
        throw new SyntaxError("Invalid parenthesis");
    }
    return tokens;
}

export default tokenizeExpression;