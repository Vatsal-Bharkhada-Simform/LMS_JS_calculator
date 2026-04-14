import calculator from "../modules/calculator.js";

function handleInsertion(dataType, data) {
    if (!data || dataType === "utility") return;

    if (dataType === "action") {
        calculator.handleAction(data);
    }
    else if (dataType === "function-pre") {
        calculator.handleFunction(data);
    }
    else if (dataType === "function-post") {
        calculator.handlePostFunction(data);
    }
    else {
        calculator.updateString(data);
    }
}

export default handleInsertion;