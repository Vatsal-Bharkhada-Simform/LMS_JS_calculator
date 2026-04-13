import calculator from "../modules/calculator.js";

function handleInsertion(dataType, data) {
    if (!data) return;

    if (dataType === "action") {
        calculator.handleAction(data);
    }
    else if (dataType === "function-pre") {
        calculator.handleFunction(data);
    }
    else {
        calculator.updateString(data);
    }
}

export default handleInsertion;