import calculatorElements from "./domElements/displayElements.js";
import calculator from "./modules/calculator.js";

// Listen for click events on buttons.

calculatorElements.buttonParent.addEventListener("click", (e) => {
    let displayData = e.target.getAttribute("dataDisplay");
    let expressionData = e.target.getAttribute("dataExpression");

    console.log(displayData, expressionData);
    if (e.target.getAttribute("dataType") === "action") {
        calculator.handleAction(expressionData);
    } else {
        calculator.updateTokens(displayData, expressionData);
    }
})

// calculatorElements.display.addEventListener("input", (e) => {
//     let input  = e.target.value;
//     if(Number)
//     console.log(e.target.value);
// });
