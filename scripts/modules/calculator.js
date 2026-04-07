import calculatorElements from "../domElements/displayElements.js";
import { updateDisplay } from "../utils/displayHandlers.js";
import { clearError, showError } from "../utils/errorHandlers.js";
import { evaluate } from "./evaluateExpression.js";


const calculator = {
    inputString: "",
    displayHasAnswer: false,
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
        let index = localStorage.getItem("index");
        
        if (!index) {
            index = 0;
        }
        
        let data = JSON.stringify({
            input,
            ans
        });

        localStorage.setItem(index, data);
        index = +index + 1;
        localStorage.setItem("index", index);

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
        const index = localStorage.getItem("index");
        if (!index || index === null || isNaN(+index)) {
            localStorage.clear();
            localStorage.setItem("index", 0);
        }

        let listItems = new DocumentFragment();

        for (let i = index; i >= 0; --i) {
            let data = localStorage.getItem(i);
            if (data === null) continue;

            try {
                data = JSON.parse(data);
            } catch (err) {
                return;
            }

            let listItem = document.createElement("li");

            let query = document.createElement("span");
            let answer = document.createElement("span");

            query.innerText = data?.input;
            answer.innerText = data?.ans;

            listItem.append(query, answer);

            listItems.append(listItem);
        }

        calculatorElements.historyList.append(listItems);
    }
}

export default calculator;