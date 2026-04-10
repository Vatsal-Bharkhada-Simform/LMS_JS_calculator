import calculatorElements from "../domElements/displayElements.js";
import { updateDisplay } from "../utils/displayHandlers.js";
import { clearError, showError } from "../utils/errorHandlers.js";
import { evaluate } from "./evaluateExpression.js";


const calculator = {
    inputString: "",
    displayHasAnswer: false,
    historyShown: false,
    setValue(str) {
        this.inputString = str;
    },
    updateString(str) {
        if(this.displayHasAnswer) {
            this.displayHasAnswer = false;
            this.inputString = str;
            updateDisplay(this.inputString);
            return;
        }
        clearError();
        this.inputString += (str || "");
        updateDisplay(this.inputString);
    },
    handleFunction(func){
        let num = "";
        let i = this.inputString.length-1;
        let hasParenthesis = func.includes("(");
        while(this.inputString[i] >= "0" && this.inputString[i] <= "9"){
            num = this.inputString[i] + num;
            i--;
        }
        this.inputString = this.inputString.slice(0,i+1) + func + this.inputString.slice(i+1) + (hasParenthesis ? ")" : "");
        updateDisplay(this.inputString);
    },
    handleAction(action) {
        clearError();
        if (action === "clearDisplay") {
            this.inputString = "";
            updateDisplay(this.inputString);
        } else if (action === "clear") {
            this.inputString = this.inputString.slice(0, -1);
            updateDisplay(this.inputString);
        } else if (action === "equals") {
            this.calculateAnswer();
        } 
    },
    calculateAnswer() {
        if (this.inputString === "") return;
        try {
            let ans = evaluate(this.inputString);
            if (ans !== undefined) {
                this.updateHistory(this.inputString, ans);
                updateDisplay(ans);
            }
            this.displayHasAnswer = true;
            this.inputString = String(ans);
        } catch (err) {
            showError(err.message);
        }
    },
    updateHistory(input, ans) {
        let data = localStorage.getItem("historyList");
        let items;

        if(!data){
            calculatorElements.emptyMessage.style.display = "flex";
            items = [];
        } else {
            calculatorElements.emptyMessage.style.display = "none";
            items = JSON.parse(data);
        }

        let newItem = {
            input,
            ans
        };

        items.push(newItem);
        
        localStorage.setItem("historyList", JSON.stringify(items));
        
        // Add new entry to history list
        let listItem = document.createElement("li");
        
        let query = document.createElement("span");
        let answer = document.createElement("span");

        query.innerText = input;
        answer.innerText = ans;
        
        listItem.append(query, answer);

        calculatorElements.historyList.prepend(listItem);
        return;
    },
    loadHistory() {
        let data = localStorage.getItem("historyList");
        if(!data || data === "[]"){
            localStorage.setItem("historyList", "[]");
            calculatorElements.emptyMessage.style.display = "flex";
            return;
        }
        calculatorElements.emptyMessage.style.display = "none";

        let historyList = JSON.parse(data).reverse();

        let listItems = new DocumentFragment();

        for (let item of historyList) {
            let listItem = document.createElement("li");

            let query = document.createElement("span");
            let answer = document.createElement("span");

            query.innerText = item?.input;
            answer.innerText = item?.ans;

            listItem.append(query, answer);

            listItems.append(listItem);
        }

        calculatorElements.historyList.append(listItems);
    }
}

export default calculator;