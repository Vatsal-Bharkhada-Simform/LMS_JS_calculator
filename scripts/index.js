import calculatorElements from "./domElements/displayElements.js";
import calculator from "./modules/calculator.js";
import { handleMemoryInput } from "./modules/memory.js";
import { operators } from "./modules/operatorReference.js";
import { loadHistory } from "./utils/historyHandlers.js";
import handleInsertion from "./utils/insertionHandler.js";

// Load history from localstorage.
loadHistory();

// Listen for click events on buttons.
calculatorElements.buttonParent.addEventListener("click", (e) => {
    handleInsertion(
        e.target.getAttribute("data-type"), 
        e.target.getAttribute("data-display")
    );
});

calculatorElements.dropdownContainer.addEventListener("click", (e) => {
    handleInsertion(
        e.target.getAttribute("data-type"), 
        e.target.getAttribute("data-display")
    );
});

// Listen user inputs and filter out alphabets
calculatorElements.display.addEventListener("input", (e) => {
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
});

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
});


document.addEventListener("keydown", (e) => {
    if(e.key !== "Tab") calculatorElements.display.focus();

    calculator.handleAction(e.key);
});

calculatorElements.invertTrigonometry.addEventListener("click", (e) => {
    calculatorElements.invertTrigonometry.classList.toggle("active");
    calculatorElements.trigonometryList.classList.toggle("show-invert");
})

calculatorElements.invertButton.addEventListener("click", () => {
    calculatorElements.invertButton.classList.toggle("active");
    calculatorElements.buttonParent.classList.toggle("show-inverse");
})

calculatorElements.memoryButtons.addEventListener("click", (e) => {
    let type = e.target.getAttribute("data-Type");
    type && handleMemoryInput(type);
})

calculatorElements.degreeButton.addEventListener("click", (e) => {
    calculator.toggleUseRadian(e.target);
})

calculatorElements.notationButton.addEventListener("click", (e) => {
    calculator.toggleNotation(e.target);
})