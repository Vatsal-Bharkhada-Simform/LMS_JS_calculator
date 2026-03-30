import { updateDisplay } from "../utils/displayHandlers.js";
import { clearError, showError } from "../utils/errorHandlers.js";
import { evaluate } from "./evaluateExpression.js";


const calculator = {
    inputString: "",
    isCeilAdded: false,
    isModuloAdded: false,
    setValue(str){
        this.inputString = str;
    },
    updateString(str){
        clearError();
        if(str === "⌈") {
            if(this.isCeilAdded){
                this.inputString += "⌉";
                this.isCeilAdded = false;
            }
            else {
                this.inputString += str;
                this.isCeilAdded = true;
            }
        } else {
            this.inputString += str;
        }
        updateDisplay(this.inputString);
    },
    handleAction(action){
        clearError();
        if(action === "clearDisplay"){
            this.isCeilAdded = false;
            this.isModuloAdded = false;
            this.inputString = "";
            updateDisplay(this.inputString);
        } else if (action === "clear"){
            this.inputString = this.inputString.slice(0, this.inputString.length-1);
            updateDisplay(this.inputString);
        } else if (action === "equals"){
            this.calculateAnswer();
        }
    },
    calculateAnswer(){
        if(this.inputString === "") return;
        try {
            let ans = evaluate(this.inputString);
            if(ans !== undefined) {
                this.updateHistory(this.inputString, ans);
                updateDisplay(ans);
            }
            this.inputString = String(ans);
        } catch (err){
            showError(err.message);
        }
    },
    updateHistory(input, ans){
        localStorage.setItem(input, ans);
        const items = {...localStorage};
    }
}

export default calculator;