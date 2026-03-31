import { updateDisplay } from "../utils/displayHandlers.js";
import { clearError, showError } from "../utils/errorHandlers.js";
import { evaluate } from "./evaluateExpression.js";


const calculator = {
    inputString: "",
    isModuloAdded: false,
    setValue(str){
        this.inputString = str;
    },
    updateString(str){
        clearError();
        this.inputString += str ? str : "";
        updateDisplay(this.inputString);
    },
    handleAction(action){
        clearError();
        if(action === "clearDisplay"){
            this.inputString = "";
            updateDisplay(this.inputString);
        } else if (action === "clear"){
            this.inputString = this.inputString.slice(0, -1);
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