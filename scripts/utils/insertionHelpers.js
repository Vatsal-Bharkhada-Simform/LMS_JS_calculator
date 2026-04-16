import { operators } from "../modules/operatorReference.js";

function wrapLastElement(str, prefix, suffix){
    let [, i] = getLastElement(str);

    if(prefix){
        str = str.slice(0,i+1) + prefix + str.slice(i+1);
    }
    if(suffix){
        str = str + suffix;
    }

    return str;
}

function getLastElement(str){
    let parenthesisIndex = str.at(-1) === ")" ? 1 : 0;
    let i = parenthesisIndex ? str.length - 2 : str.length - 1;
    let num = parenthesisIndex ? ")" : "";
    if(parenthesisIndex){
        while(i >= 0){
            if(str[i] === ")") ++parenthesisIndex;
            else if(str[i] === "(") --parenthesisIndex;
            num = str[i]+num;
            i--;
            if(parenthesisIndex === 0) break;
        }
    } else {
        while((str[i] >= "0" && str[i] <= "9") || str[i] === ".") {
            num = str[i]+num;
            i--;
        }
    }
    if(str[i] === "-"){
        if(i > 0 && (str[i-1] === "(" || operators[str[i-1]].precedence)){
            num = str[i]+num;
            i--;
        }
    }
    return [num, i];
}

export {wrapLastElement, getLastElement};