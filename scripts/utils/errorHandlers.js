import calculatorElements from "../domElements/displayElements.js";

function showError(error){
    calculatorElements.errorScreen.innerText = error;
    return;
}

function clearError(){
    calculatorElements.errorScreen.innerText = "";
    return;
}

export {showError, clearError};