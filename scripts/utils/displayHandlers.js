import calculatorElements from "../domElements/displayElements.js";

function updatePreview(content){
    calculatorElements.secondaryScreen.innerText = content;
}

function updateDisplay(content){
    calculatorElements.display.value = content;
}

export {updateDisplay, updatePreview};