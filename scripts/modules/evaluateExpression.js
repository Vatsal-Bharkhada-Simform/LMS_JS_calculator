import {operators, aliasMap} from "./operatorReference.js";

function evaluateUnaryOperators(op, a){
    switch(op){
        case "-" : return a*-1;
        case "R" : return Math.sqrt(a);
        case "L" : return Math.log10(a);
        case "N" : return Math.log(a);
        case "C" : return Math.ceil(a);
        case "M" : return Math.abs(a);
        case "!" : return factorial(a);
    }
}

function evaluateBinaryOperators(op, b, a){
    switch(op){
        case "+" : return a+b;
        case "-" : return a-b;
        case "*" : return a*b;
        case "/" : return a/b;
        case "^" : return a**b;
    }
}

function factorial(n){
    let ans = 1;
    for(let i = n ; i > 0 ; --i) ans *= i;
    return ans; 
}

let str = "134+25*log(6)/2+3*5";

function evaluate(str){
    let tokens;
    try {
        tokens = tokenizeExpression(str);
    } catch (err){
        console.log(err);
        return;
    }

    let hStack = [];
    let oStack = [];
    let result = [];
    let curr = "";
    let temp = "";

    for(let i = 0 ; i < tokens.length ; i++){
        if(!isNaN(Number(tokens[i]))) {
            console.log("Pushing number: ", tokens[i]);
            oStack.push(Number(tokens[i]));
        } else if(tokens[i] === "("){
            hStack.push(tokens[i]);
        } else if (tokens[i] === ")"){
            while(hStack[hStack.length-1] !== "("){
                oStack.push(hStack.pop());
            }
            hStack.pop();
        }
        else if(operators[tokens[i]] !== undefined){
            if(hStack.length === 0){
                console.log("Pushing operator: ", tokens[i], " at index: ", hStack.length);
                hStack.push(tokens[i]);
            } else if (operators[hStack[hStack.length-1]].precedence <= operators[tokens[i]].precedence){
                console.log("Pushing operator: ", tokens[i], " at index: ", hStack.length);
                hStack.push(tokens[i]);
            } else {
                while (operators[hStack[hStack.length-1]].precedence > operators[tokens[i]].precedence){
                    console.log("Pushing operator: ", tokens[i], " at index: ", hStack.length);
                    temp = hStack.pop();
                    oStack.push(temp);
                }
                hStack.push(tokens[i]);
            }
        } else {
            return new Error("Invalid expression");
        }
    }
    
    while(hStack.length !== 0) {
        oStack.push(hStack.pop());
    }
    
    console.log("\n", hStack);
    console.log("\n", oStack);
    console.log("\n", result);
    
    for(let i = 0 ; i < oStack.length ; i++){
        if(!isNaN(Number(oStack[i]))) result.push(oStack[i]);
        else{
            if(operators[oStack[i]].operands === 2){
                console.log("Evaluating: ", result[result.length-1], oStack[i], result[result.length-2]);
                temp = evaluateBinaryOperators(oStack[i], result.pop(), result.pop());
                console.log("Answer: ", temp);
                result.push(temp);
            } else {
                console.log("Evaluating: ", oStack[i], result[result.length-1]);
                temp = evaluateUnaryOperators(oStack[i], result.pop());
                console.log("Answer: ", temp);
                result.push(temp);
            }
        }

        console.log("\n\nCurrent Ans array: ", result, "\n");
    }
    
        console.log("\n", hStack);
        console.log("\n", oStack);
        console.log("\n", result);

    return result[0];
}

function tokenizeExpression(str){
    let parenthesisIndex = 0;
    let moduloIndex = 0;
    let ceilIndex = 0;
    let curr = "";
    let alias = "";
    let tokens = [];

    for(let i = 0 ; i < str.length ; i++){
        if(!isNaN(Number(str[i]))) curr += str[i];
        else if (operators[str[i]] !== undefined){
            if(curr !== "") {
                tokens.push(curr);
                curr = "";
            }
            else if(aliasMap[alias] !== undefined){
                tokens.push(aliasMap[alias]);
                alias = "";
            }
            tokens.push(str[i]);
        } else if(isNaN(Number(str[i]))){
            if(aliasMap[str[i]] !== undefined) {
                if(aliasMap[alias] !== undefined) tokens.push(aliasMap[alias]);
                tokens.push(str[i]);
            }
            else if (aliasMap[alias] !== undefined) {
                tokens.push(aliasMap[alias]);
                alias = "";
            } else if(alias.length < 3){
                alias += str[i];
            } else {
                throw new SyntaxError("Invalid expression. Unrecongnised identifier: ", alias);
            }
        }

        if(str[i] === '(') ++parenthesisIndex;
        else if(str[i] === ')') --parenthesisIndex;
        else if(str[i] === '⌈') ++ceilIndex;
        else if(str[i] === '⌉') --ceilIndex;
        else if(str[i] === '|') moduloIndex === 0 ? 1 : 0;
    }

    if(curr !== "") tokens.push(curr);
    else if (alias !== ""){
        if(aliasMap[alias] !== undefined) tokens.push(aliasMap[alias]);
        else {
            throw new SyntaxError("Invalid expression. Unrecongnised identifier: ", alias);
        }
    }

    if(parenthesisIndex !== 0 || moduloIndex !== 0 || ceilIndex !== 0) {
        throw new SyntaxError("Invalid parenthesis.");
    }

    console.log("\nTokens: ", tokens, "\n\n");

    return tokens;
}

try{
    console.log(evaluate(str));
} catch (err) {
    console.log(err);
}