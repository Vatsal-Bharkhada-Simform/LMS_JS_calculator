import calculatorElements from "../domElements/displayElements.js";

function showError(error){
    calculatorElements.errorScreen.innerText = error;
}

function clearError(){
    calculatorElements.errorScreen.innerText = "";
}

export {showError, clearError};