const calculatorElements = {
    display: document.querySelector("#display"),
    errorScreen: document.querySelector(".body__error-screen"),
    buttonParent: document.querySelector(".body__buttons"),
    previewScreen: document.querySelector(".body__preview"),
    historyContainer: document.querySelector(".calculator__history"),
    historyList: document.querySelector(".history__list"),
    historyToggle: document.querySelector(".history-toggle"),
    historyDelete: document.querySelector(".history-delete"),
    emptyMessage: document.querySelector(".empty_message"),
    dropdownContainer: document.querySelector(".dropdown-container"),
    invertTrigonometry: document.querySelector("#invert-trignometry"),
    trigonometryList: document.querySelector("#trigonometry-list"),
    invertButton: document.querySelector("#invert-function"),
}

Object.freeze(calculatorElements);

export default calculatorElements;