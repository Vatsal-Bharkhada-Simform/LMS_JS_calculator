const calculatorElements = {
    display: document.querySelector("#display"),
    secondaryScreen: document.querySelector(".body__secondary-screen"),
    buttonParent: document.querySelector(".body__buttons"),
    previewScreen: document.querySelector(".body__preview"),
    historyContainer: document.querySelector(".calculator__history"),
    historyList: document.querySelector(".history__list"),
    historyToggle: document.querySelector(".history-toggle"),
    historyDelete: document.querySelector(".history-delete"),
    emptyMessage: document.querySelector(".empty_message"),
    dropdownContainer: document.querySelector(".dropdown-container"),
    invertTrigonometry: document.querySelector("#invert-trigonometry"),
    trigonometryList: document.querySelector("#trigonometry-list"),
    invertButton: document.querySelector("#invert-function"),
    modeButtons: document.querySelector(".button-modes"),
    memoryButtons: document.querySelector(".button-memory"),
    memoryClear: document.querySelector("[data-Type='MC']"),
    memoryRead: document.querySelector("[data-Type='MR']"),
    degreeButton: document.querySelector("[data-Type='DEG']"),
    notationButton: document.querySelector("[data-Type='FE']"),
}

Object.freeze(calculatorElements);

export default calculatorElements;