function calculateAnswer(parenthesisIndex, evalExpression) {
    if (parenthesisIndex !== 0) {
        return {
            status: 500,
            message: "Malformed expression."
        };
    }
    try {
        let answer = 0;
        answer = eval(evalExpression);

        return {
            status: 200,
            answer
        };
    } catch (err) {
        return {
            status: 500,
            message: "Error while ."
        };
    }
}

export default calculateAnswer;