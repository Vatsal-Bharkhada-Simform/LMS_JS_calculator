import { operators } from "../modules/operatorReference.js";
import { showError } from "./errorHandlers.js";

function toggleSign(str) {
    let parenthesisIndex = str[str.length-1] === ")" ? 1 : 0;
    let i = parenthesisIndex ? str.length - 2 : str.length - 1;
    let num = "";
    if(parenthesisIndex){
        while(i >= 0){
            if(str[i] === ")") ++parenthesisIndex;
            else if(str[i] === "(") --parenthesisIndex;
            if(parenthesisIndex === 0) break;
            num = str[i]+num;
            i--;
        }
        if(i < 0 || parenthesisIndex !== 0) showError("Invalid Parenthesis");
        else if (!isNaN(+num)){
            if(str[i+1] === "-"){
                str = str.slice(0,i) + str.slice(i+2, str.length-1);
            } else {
                str = str.slice(0, i+1) + "-" + str.slice(i+1);
            }
        }
        else if(str[i+1] === "-" && str[i+2] === "("){
            str = str.slice(0, i) + str.slice(i+2, str.length-1);
        }
        else if (i === 0){
            str = "(-" + str + ")";
        }
        else {
            str = str.slice(0, i) + "(-" + str.slice(i) + ")";
        }
    }
    else {
        while(i >= 0 && !operators[str[i]]) {
            i--;
        }
        str = str.slice(0, i+1) + "(-" + str.slice(i+1) + ")";
    }
    return str;
}

export default toggleSign;