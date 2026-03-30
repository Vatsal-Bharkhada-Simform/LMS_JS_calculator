import calculatorElements from "../domElements/displayElements.js";

function showError(error){
    calculatorElements.errorScreen.innerHTML = error;
    return;
}

function clearError(){
    calculatorElements.errorScreen.innerHTML = "";
    return;
}

export {showError, clearError};