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
    "^": {
        precedence: 3,
        operands: 2
    },
    "R": {
        precedence: 4,
        operands: 1,
        alias: "√"
    },
    "L": {
        precedence: 5,
        operands: 1,
        alias: "log"
    },
    "N": {
        precedence: 5,
        operands: 1,
        alias: "N"
    },
    "C": {
        precedence: 6,
        operands: 1,
        alias: "C"
    }, 
    "M": {
        precedence: 6,
        operands: 1,
        alias: "M"
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

const aliasMap = {
    "log": "L",
    "√": "R",
    "ln": "N",
    "⌈": "C",
    "|": "M",
}

export {operators, aliasMap};