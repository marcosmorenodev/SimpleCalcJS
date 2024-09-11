//DOM Related Variables

let calcOutput = document.getElementById("calculator-output");
const errorMsg = document.getElementById("error-msg");
const numberBtns = document.querySelectorAll(".number-btn");
const operandBtns = document.querySelectorAll(".operand-btn");
const clearBtn = document.getElementById("clear-btn");
const equalBtn = document.getElementById("equal-btn");

//==========================//

let operand;
let isOperandSelected = false; //Flag used to dictate which number from "numbers" should be ppopulated

const numbers = {
    firstNumber: [],
    lastNumber: []
};

numberBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        //* Since JS converts arrays by default to a single string, this will be basically like string concatenation, joining string after string (in this case, numbers, altough they're ACTUALLY strings anyways). 
        //* The reason why I'm choosing arrays over strings and string concatenation it's because of two factors: the first one being that an array is clearer when it comes to represent digits, and the last one, it's because they simplify error handling quite a lot, by, for example, check if a number was actually a NaN.
        
        let localFirst = [];
        let localLast = [];

        if (!isOperandSelected) { //"isOperandSelected" is false by default
            localFirst += (e.target).value;
            calcOutput.value += localFirst;

            numbers.firstNumber.push(localFirst);
        }
        
        else {
            localLast += (e.target).value;
            calcOutput.value += localLast;

            numbers.lastNumber.push(localLast);
        }
    });
});

operandBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => { 
        if (operand) { return; } //Prevents adding more than one operand

        else if (!numbers.firstNumber.length) { 
            calcOutput.classList.add("error-msg"); 

            return calcOutput.value = "ENTER A NUMBER!"; 
        }

        else {
            operand = (e.target).value;
            isOperandSelected = true;

            calcOutput.value += operand;
        }
    });
});

equalBtn.addEventListener("click", () => {
    if (!numbers.firstNumber.length || !numbers.lastNumber.length) {
        calcOutput.classList.add("error-msg"); 

        return calcOutput.value = "NUMBER(S) MISSING";
    }

    else {
        if (!operand) {
            calcOutput.classList.add("error-msg"); 

            return calcOutput.value = "OPERAND MISSING"; 
        }

        //* Here, I reduce each array (which is actually a string) to a single string (as mentioned in the documentation, it is a similar method to string concatenation), and then, I parse them as floats at the moment of passing them as arguments.
        let singleFirstNum = numbers.firstNumber.reduce((acc, curr) => acc + curr);
        let singleLastNum = numbers.lastNumber.reduce((acc, curr) => acc + curr);

        const calculationArr = [parseFloat(singleFirstNum), parseFloat(singleLastNum)];
    
        calcOutput.value = ""; //Clears the DOM before displaying the result
    
        displayResult(calculationArr);
    }
});

function displayResult(calculationArr) {
    let result;

    switch (operand) {
        case "+": {
            result = calculationArr.reduce((acc, curr) => acc + curr);

            break;
        }

        case "-": { 
            result = calculationArr.reduce((acc, curr) => acc - curr);

            break;
        }

        case "*": { 
            result = calculationArr.reduce((acc, curr) => acc * curr, 1);

            break;
        }

        case "/": { 
            result = calculationArr.reduce((acc, curr) => acc / curr); 

            break;
        }
    }

    if (isNaN(result)) {
        calcOutput.classList.add("error-msg");

        return calcOutput.value = "CALC ERROR!";
    }

    calcOutput.classList.add("result");
    calcOutput.value = result.toFixed(2);
}

clearBtn.addEventListener("click", () => { window.location.reload(); });