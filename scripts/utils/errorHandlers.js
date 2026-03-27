import calculatorElements from "../domElements/displayElements.js";

function showError(error){
    let message = "";
    if(!error.status) error.status = 500;
    switch (error.status){
        case 500:
            message = "Error while calculating expression.";
            break;
        case 501:
            message = "Missing parenthesis.";
            break;
        case 502:
            message = "Malformed expression.";
            break;
    }
    calculatorElements.errorScreen.innerHTML = message;
    return;
}

function clearError(){
    calculatorElements.errorScreen.innerHTML = "";
    return;
}

export {showError, clearError};