import calculatorElements from "./domElements/displayElements.js";
import calculator from "./modules/calculator.js";
import { operators } from "./modules/operatorReference.js";

// Load history from localstorage.
calculator.loadHistory();

// Listen for click events on buttons.
calculatorElements.buttonParent.addEventListener("click", (e) => {
    let displayData = e.target.getAttribute("data-Display");

    if (e.target.getAttribute("data-Type") === "action") {
        calculator.handleAction(displayData);
    } else {
        calculator.updateString(displayData);
    }
})

// Listen user inputs and filter out alphabets
calculatorElements.display.addEventListener("input", (e) => {
    if(!isNaN(Number(e.data)) || operators[e.data] || e.data === ".") {
        calculator.setValue(e.target.value);
        return;
    }
    e.target.value = calculator.inputString;
});

// Clear history
calculatorElements.historyDelete.addEventListener("click", (e) => {
    let answer = confirm("Delete history?");
    if(answer) localStorage.clear();
    calculatorElements.historyList.replaceChildren();
})

// Toggle history view
calculatorElements.historyToggle.addEventListener("click", (e) => {
    if(calculator.historyShown){
        calculatorElements.historyContainer.classList.remove("show");
        calculatorElements.historyContainer.classList.add("hide");
        calculator.historyShown = false;
    } else {
        calculatorElements.historyContainer.classList.remove("hide");
        calculatorElements.historyContainer.classList.add("show");
        calculator.historyShown = true;
    }
})


document.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        calculator.calculateAnswer();
    }
    else if (e.key === "Escape"){
        calculator.handleAction("clearDisplay");
    } 
    else if (e.key === "=") {
        calculator.calculateAnswer();
    }
})