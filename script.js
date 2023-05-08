let isBig = false;
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
    isBig = false
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    if(this.currentOperand.length < 9){
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  sign(){
   this.currentOperand = -1 * this.currentOperand
   if(this.currentOperand.toString().length < 9){
    isBig = false
    
    }else{
    isBig = true
    }
  }
  percent(){
    this.currentOperand = this.currentOperand/100;
    if(this.currentOperand.toString().length < 9){
      isBig = false
      
    }else{
      isBig = true
    }
  }
  
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)

    if(isBig){
        console.log(typeof(prev))
        console.log(typeof(current))

       // prev = Number(prev)
        //current = Number(current)
        alert(prev)
    }
    if (isNaN(prev) || isNaN(current)) return

    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    if(computation.toString().length < 9){
        isBig = false
        
    }else{
        isBig = true
    }
    
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])

   /*if(stringNumber.length < 10){
      integerDigits = parseFloat(stringNumber.split('.')[0])
    }else{
      integerDigits = parseFloat(stringNumber.split('.')[0]).toPrecision(5)
    }*/
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    if(isBig){
        this.currentOperandTextElement.innerText = (Number.parseFloat(this.getDisplayNumber(this.currentOperand).replaceAll(',',''))).toExponential(4)
        isBig = false
    }else{
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    }
    if(this.currentOperandTextElement.innerText === ''){
        this.currentOperandTextElement.innerText = ''
    }
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }

}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const signButton = document.querySelector('[data-sign]')
const percentButton = document.querySelector('[data-percent]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})
signButton.addEventListener('click', button => {
    calculator.sign()
    calculator.updateDisplay()
})
percentButton.addEventListener('click', button => {
    calculator.percent()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})