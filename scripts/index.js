import calculatorElements from "./domElements/displayElements.js";
import calculator from "./modules/calculator.js";

// Listen for click events on buttons.

calculatorElements.buttonParent.addEventListener("click", (e) => {
    let displayData = e.target.getAttribute("data-Display");

    console.log(displayData);
    if (e.target.getAttribute("data-Type") === "action") {
        calculator.handleAction(displayData);
    } else {
        calculator.updateString(displayData);
    }
})

calculatorElements.display.addEventListener("input", (e) => {
    let inputString  = e.target.value;
    calculator.setValue(inputString);
});

let prev = "";

document.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        calculator.calculateAnswer();
    }
    else if (e.key === "Escape"){
        calculator.handleAction("clearDisplay");
    } 
    else if (prev === "Control" && e.key === "k") {
        console.log("Heyy");
    } else {
        prev = e.key;
    }

    // console.log(e);
})