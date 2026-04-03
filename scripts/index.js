import calculatorElements from "./domElements/displayElements.js";
import calculator from "./modules/calculator.js";

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

// Listen user inputs
calculatorElements.display.addEventListener("input", (e) => {
    let inputString  = e.target.value;
    calculator.setValue(inputString);
});


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