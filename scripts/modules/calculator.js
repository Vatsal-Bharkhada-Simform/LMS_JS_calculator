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
        this.inputString += str ? str : "";
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
        console.log(data);
        if(!data){
            localStorage.setItem("historyList", "[]");
            return;
        }

        let items = JSON.parse(data);
        
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
        console.log(data);
        if(!data){
            localStorage.setItem("historyList", "[]");
            return;
        }

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