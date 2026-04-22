import calculator from "../modules/calculator.js";

function handleInsertion(dataType, data) {
    if (!data || dataType === "utility") return;
    
    switch(dataType){
        case "action":
            calculator.handleAction(data);
            break;
        case "function-pre":
            calculator.handleFunction(data);
            break;
        case "function-post":
            calculator.handlePostFunction(data);
            break;
        case "sign-toggle":
            calculator.handleSignToggle(data);
            break;
        case "random":
            calculator.updateString(String(Math.round(Math.random()*100)/100));
            break;
        default:
            calculator.updateString(data);
    }
}

export default handleInsertion;