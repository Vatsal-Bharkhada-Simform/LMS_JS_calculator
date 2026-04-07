const operators = {
    "+": {
        precedence: 1,
        operands: 2,
    },
    "-": {
        precedence: 1,
        operands: 2,
    },
    "*": {
        precedence: 2,
        operands: 2
    },
    "/": {
        precedence: 2,
        operands: 2
    },
    "%": {
        precedence: 2,
        operands: 2
    },
    "^": {
        precedence: 3,
        operands: 2
    },
    "√": {
        precedence: 4,
        operands: 1,
    },
    "log": {
        precedence: 5,
        operands: 1,
    },
    "ln": {
        precedence: 5,
        operands: 1,
    },
    "|": {
        precedence: 6,
        operands: 1,
    },
    "UP": {
        precedence: 7,
        operands: 1
    },
    "UM": {
        precedence: 7,
        operands: 1
    },
    "!": {
        precedence: 7,
        operands: 1
    },
    "(": {
        precedence: undefined,
        operands: undefined,
    },
    ")": {
        precedence: undefined,
        operands: undefined,
    },
}

const constants = {
    "e" : Math.E,
    "π" : Math.PI,
}

export {operators, constants};