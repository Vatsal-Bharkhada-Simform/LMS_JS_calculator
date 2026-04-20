import { updateDisplay, updatePreview } from "../utils/displayHandlers.js";
import { clearError, showError } from "../utils/errorHandlers.js";
import { updateHistory } from "../utils/historyHandlers.js";
import { validateInput, wrapLastElement } from "../utils/insertionHelpers.js";
import toggleSign from "../utils/toggleSign.js";
import { evaluate } from "./evaluateExpression.js";
import { evaluateUnaryOperators } from "./evaluationFunctions.js";
import { trigonometricFunctions } from "./operatorReference.js";

const calculator = {
    inputString: "",
    displayHasAnswer: false,
    useRadian: false,
    showScientificNotation: false,
    historyShown: false,
    setValue(str) {
        clearError();
        // if(!isValidInput(str.at(-1))) return;

        this.inputString = validateInput(this.inputString, str.at(-1));
        updateDisplay(this.inputString);
    },
    updateString(str) {
        clearError();
        // if(!isValidInput(str)) return;
        
        this.inputString = validateInput(this.inputString, str);
        updateDisplay(this.inputString);
    },
    handleFunction(func) {
        let hasParenthesis = func.includes("(") && this.inputString;
        this.inputString = wrapLastElement(this.inputString, func, hasParenthesis && ")");
        updateDisplay(this.inputString);
    },
    handlePostFunction(func){
        if (this.inputString === "") return;
        try {
            let ans = evaluate(this.inputString);
            if (ans !== undefined) {
                if(trigonometricFunctions.includes(func)){
                    ans = this.evaluateTrigonometricFunction(func, ans);
                } else {
                    ans = evaluateUnaryOperators(func, ans);
                }

                if((!ans && ans !== 0) || isNaN(ans)){
                    throw new SyntaxError("Error while evaluating function");
                } else {
                    this.handleDisplayAnswer(ans);
                }
            }
        } catch (err) {
            showError(err.message);
        }
    },
    handleSignToggle() {
        if(!this.inputString) return;
        this.inputString = toggleSign(this.inputString);
        updateDisplay(this.inputString);
    },
    handleAction(action) {
        clearError();

        switch (action){
            case "clearDisplay":
            case "Escape":
                this.inputString = "";
                updateDisplay(this.inputString);
                break;
            
            case "clear":
            case "Backspace":
                this.inputString = this.inputString.slice(0, -1);
                updateDisplay(this.inputString);
                break;

            case "equals":
            case "=":
            case "Enter":
                this.calculateAnswer();
                break;
        }
    },
    calculateAnswer() {
        if (this.inputString === "") return;
        try {
            let ans = evaluate(this.inputString);
            if (ans !== undefined) {
                this.handleDisplayAnswer(ans);
            }
        } catch (err) {
            showError(err.message);
        }
    },
    toggleUseRadian(elem){
        this.useRadian = !this.useRadian;
        elem.innerText = (elem.innerText === "DEG") ? "RAD" : "DEG";
        elem.setAttribute("title", (`Using ${(elem.innerText === "DEG") ? "degrees" : "radians"}`));
    },
    evaluateTrigonometricFunction(func, ans){
        this.inputString = func + "(" + ans + ")";
        if(!this.useRadian){
            ans = (ans / 57.2958);
        }
        return evaluateUnaryOperators(func, ans);
    },
    toggleNotation(elem){
        this.showScientificNotation = !this.showScientificNotation;
        elem.innerText = (elem.innerText === "F" ? "E" : "F");
        elem.setAttribute("title", (`Showing answer in ${(elem.innerText === "F") ? "regular" : "scientific"} notation`));
    },
    handleDisplayAnswer(ans){
        if(this.showScientificNotation){
            ans = Number(ans).toExponential();
        }
        updateHistory(this.inputString, ans);
        updateDisplay(ans);
        updatePreview(this.inputString);

        this.displayHasAnswer = true;
        this.inputString = String(ans);
    }
}

export default calculator;