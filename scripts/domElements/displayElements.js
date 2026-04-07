const calculatorElements = {
    display: document.querySelector("#display"),
    errorScreen: document.querySelector(".body__error-screen"),
    buttonParent: document.querySelector(".body__buttons"),
    previewScreen: document.querySelector(".body__preview"),
    historyList: document.querySelector("#history__list"),
    historyDelete: document.querySelector(".history-delete"),
}

Object.freeze(calculatorElements);

export default calculatorElements;