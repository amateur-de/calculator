const add = (a,b)=>a + b

const subtract = (a,b)=>a - b

const multiply = (a,b)=>Math.round(a * b * 100)/100

const divide = (a,b)=>Math.round(a / b * 100)/100

const reset = ()=> {
    firstNumber = '0'
    secondNumber = null
    operator = null
    display.textContent = 0
    mode = 'operand1'
}

const handleInfinity = ()=> {
     alert('Division by zero is not defined')
     reset()

}

const display = document.querySelector('.display')

let firstNumber = '0', secondNumber = null , operator = null 
let mode = 'operand1'

const operate = (firstNum , secondNum , operation)=> {
    if( operation === '+')
    {
        return add(Number(firstNum) , Number(secondNum))
    }
    else if( operation === '-')
    {
        return subtract(firstNum , secondNum)
    }
    else if( operation === '*')
    {
        return multiply(firstNum , secondNum)
    }
    else
    {
        return divide(firstNum , secondNum)
    }
}



const displayControl = (e)=> {
    console.log('Expression class')
    console.log( e.target.textContent , 'Button')
    let input = e.target.textContent
    if( mode === 'operand1')
    {
            if( input >= 0 && input <= 9)
            {
                firstNumber == 0 && firstNumber.includes('.') == false
                 ? firstNumber = input : firstNumber += input
                display.textContent = firstNumber
            }
            else if(input === '+' || input === '-' || input === '*' || input === '/')
            {
                if(firstNumber.length !== 0)
                {
                    operator = input
                    mode = 'operand2'
                }
               
            }
            else if( input === '.' && firstNumber.includes('.') == false)
            {
                 firstNumber += input
                 display.textContent = firstNumber
            }
            else if( input == 'DEL' && firstNumber.length !== 0 ||
                 (firstNumber.length !== 0 && firstNumber[0] == '0' && firstNumber.includes('.') == true))
            {
                  firstNumber = firstNumber.slice(0 , -1)   
                  display.textContent = firstNumber
            }
             

    }
    else if( mode === 'operand2')
    {
            if( input >= 0 && input <= 9)
            {
                (secondNumber == 0 && secondNumber.includes('.') == false)
                || secondNumber === null
                 ? secondNumber = input : secondNumber += input
                display.textContent = secondNumber
            }
            else if(input === '+' || input === '-' || input === '*' || input === '/')
            {
                if( secondNumber == 0 && operator == '/')
                {
                       handleInfinity()
                }
                else if(secondNumber !== null && secondNumber.length !== 0)  
                {
                    firstNumber = operate(firstNumber , secondNumber , operator)
                    display.textContent = firstNumber
                    operator = input
                    secondNumber = null

                }
                
            }
            else if( input === '.' && secondNumber.includes('.') == false && secondNumber !== null
        && secondNumber.length !== 0)
            {
                secondNumber += input
                display.textContent = secondNumber
            }
            else if( input == 'DEL' && secondNumber.length !== 0 ||
                (secondNumber.length !== 0 && secondNumber[0] == '0' && secondNumber.includes('.') == true))
            {
                 secondNumber = secondNumber.slice(0 , -1)   
                 display.textContent = secondNumber
            }
    }
    else if( mode == '?')
    {
        if( input >= 0 && input <= 9)
        {
             mode = 'operand1'
             firstNumber = input
             display.textContent = firstNumber
        }
        else if(input === '+' || input === '-' || input === '*' || input === '/')
        {
            mode = 'operand2'
            operator = input
        }
    }

}


const buttons = document.querySelectorAll('.expression')

const clear = document.querySelector('.clear')

const result = document.querySelector('.result')



buttons.forEach((button)=> button.addEventListener('click' , displayControl))

clear.addEventListener('click' , reset)

result.addEventListener('click' , ()=> {
    if( firstNumber !== null && secondNumber !== null && operator !== null)
    {
        if( secondNumber == 0 && operator == '/')
        {
                   handleInfinity()
        }
        else
        {
            firstNumber = operate(firstNumber , secondNumber , operator)
            display.textContent = firstNumber
            operator = null
            secondNumber = null
            mode = '?'
    

        }
       
    }

})







