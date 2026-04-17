import calculatorElements from "../domElements/displayElements.js";
import { showError } from "../utils/errorHandlers.js"
import calculator from "./calculator.js";

const memoryState = {
    memoryContent: 0,
    incrementMemory(value) {
        if (this.isInvalidValue(value)) return;
        this.enableMemoryButtons();
        this.memoryContent += (+value);
    },
    decrementMemory(value) {
        if (this.isInvalidValue(value)) return;
        this.enableMemoryButtons();
        this.memoryContent -= (+value);
    },
    saveToMemory(value) {
        if (this.isInvalidValue(value)) return;
        this.enableMemoryButtons();
        this.memoryContent = (+value);
    },
    injectMemoryValue() {
        calculator.updateString(this.memoryContent);
    },
    clearMemory() {
        this.disableMemoryButtons();
        this.memoryContent = 0;
    },
    isInvalidValue(value) {
        if (isNaN(+value)) {
            showError("Invalid value");
            return true;
        }
        return false;
    },
    disableMemoryButtons(){
        calculatorElements.memoryClear.setAttribute("disabled", true);
        calculatorElements.memoryRead.setAttribute("disabled", true);
    },
    enableMemoryButtons(){
        calculatorElements.memoryClear.removeAttribute("disabled");
        calculatorElements.memoryRead.removeAttribute("disabled");
    },
}

function handleMemoryInput(type){
    switch (type) {
        case "M+":
            memoryState.incrementMemory(calculator.inputString);
            break;
        case "M-":
            memoryState.decrementMemory(calculator.inputString);
            break;
        case "MS":
            memoryState.saveToMemory(calculator.inputString);
            break;
        case "MR":
            memoryState.injectMemoryValue();
            break;
        case "MC":
            memoryState.clearMemory();
            break;
    }
}

export { handleMemoryInput };