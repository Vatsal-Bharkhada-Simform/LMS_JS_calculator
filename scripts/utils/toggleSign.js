import { operators } from "../modules/operatorReference.js";
import { showError } from "./errorHandlers.js";
import { getLastElement, wrapLastElement } from "./insertionHelpers.js";

function toggleSign(str) {
    let [lastElement, index] = getLastElement(str);

    if(lastElement.startsWith("(-")){
        str = str.slice(0, index) + str.slice(index+2, str.length-1);
    } 
    else if(lastElement.startsWith("-")) {
        str = str.slice(0, index) + str.slice(index+1);
    } 
    else {
        str = wrapLastElement(str, "(-", ")");
    }
    return str;
}

export default toggleSign;