import { operators } from "../modules/operatorReference.js";

function handleUnaryOperators(tokens){
    for(let i = 0 ; i < tokens.length ; i++){
        if ((tokens[i] === "-" || tokens[i] === "+" || tokens[i] === "!") && (i === 0 || operators[tokens[i-1]]?.precedence || tokens[i - 1] === "|" || tokens[i - 1] === "(")) {
            if(tokens[i] === "!"){
                throw new SyntaxError("Wrong placement of factorial");
            }
            else if(tokens[i] === "-"){
                tokens[i] = "UM";
            }
            else{
                tokens[i] = ""; // Removing unary plus as it has no significance
            }
        }
    }

    return tokens.filter(token => token !== "");
}

export { handleUnaryOperators };