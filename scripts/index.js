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
    } 
    else if (e.target.getAttribute("data-Type") === "function-pre") {
        calculator.handleFunction(displayData);
    } 
    else if (e.target.getAttribute("data-Type") === "function-post") {
        calculator.handlePostFunction(displayData);
    } 
    else if (e.target.getAttribute("data-Type") === "sign-toggle") {
        calculator.handleSignToggle(displayData);
    } 
    else {
        calculator.updateString(displayData);
    }
})

// Listen user inputs and filter out alphabets
calculatorElements.display.addEventListener("input", (e) => {
    console.log(e.data);
    console.log(!isNaN(Number(e.data)));
    if(e.data && (!isNaN(Number(e.data)) || operators[e.data] || e.data === ".")) {
        calculator.setValue(e.target.value);
    }
    e.target.value = calculator.inputString.trim();
});

// Clear history
calculatorElements.historyDelete.addEventListener("click", (e) => {
    localStorage.clear();
    calculatorElements.historyList.replaceChildren(calculatorElements.emptyMessage);
    calculatorElements.emptyMessage.style.display = "flex";
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
    if(e.key !== "Tab") calculatorElements.display.focus();
    if(e.key === "Enter") {
        calculator.calculateAnswer();
    }
    else if (e.key === "Escape"){
        calculator.handleAction("clearDisplay");
    } 
    else if (e.key === "Backspace"){
        calculator.handleAction("clear");
    } 
    else if (e.key === "=") {
        calculator.calculateAnswer();
    }
})
