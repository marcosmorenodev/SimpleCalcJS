//DOM Related Variables

let calcOutput = document.getElementById("calculator-output");
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
        //* Since the "e" in this case of type string, we have to make the numbers strings as well, 
        
        let localFirst = "";
        let localLast = "";

        if (!isOperandSelected) { //"isOperandSelected" is false by default
            localFirst += (e.target).value;
            calcOutput.value += localFirst;

            (numbers.firstNumber).push(localFirst);
        }
        
        else {
            localLast += (e.target).value;
            calcOutput.value += localLast;

            (numbers.lastNumber).push(localLast);
        }
    });
});

operandBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => { 
        if (operand) { return; } //Prevents adding more than one operand

        else if (!(numbers.firstNumber).length) { 
            calcOutput.classList.add("error-msg"); 
            calcOutput.value = "ENTER A NUMBER!";

            setTimeout(() => {
                 calcOutput.classList.remove("error-msg");

                 calcOutput.value = "";
            }, 1500); 
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
        calcOutput.value = "NUMBER(S) MISSING";

        setTimeout(() => {
            calcOutput.classList.remove("error-msg");

            calcOutput.value = "";
        }, 1500); 
    }

    else {
        if (!operand) {
            calcOutput.classList.add("error-msg"); 

            return calcOutput.value = "OPERAND MISSING"; 
        }

        //* Here, I reduce each array's content to a single string; and then, I cast them as floats at the moment of assigning each of them to a new array.
        let singleFirstNum = (numbers.firstNumber).reduce((acc, curr) => acc + curr);
        let singleLastNum = (numbers.lastNumber).reduce((acc, curr) => acc + curr);

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