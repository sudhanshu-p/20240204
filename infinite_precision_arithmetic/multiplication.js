/*
Problem - Write a Javascript function that takes in 2 arrays, with each 
digit being in the range 0 - 9 and returns their multiplication in the
form of another array with each digit from 0 to 9.
No negatives as of now.
*/

/**
 * @param {Array<Number>} firstNumber
 * @param {Array<Number>} secondNumber
 * @returns {Array<Number>} firstNumber * secondNumber
 * @throws {TypeError} for incorrect arguments
 * @throws {RangeError} if the values aren't 0 - 9 in each column
 * This function does the error handling part, and then calls the simpleAdd
 * function. simpleAdd is not expected to be public.
 */
function multiply(firstNumber, secondNumber) {
    // Check for correct arguments passed
    if (!Array.isArray(firstNumber) || !Array.isArray(secondNumber)) {
        throw TypeError("The inputs should be Arrays!")
    }

    // Checking each position in both the array
    for (let i = 0; i < firstNumber.length; i++) {
        if (!Number.isInteger(firstNumber[i])) {
            throw TypeError("Inputs should strictly be Integers")
        }
        if (firstNumber[i] < 0 || firstNumber[i] > 9) {
            throw RangeError("The values in the array should be 0 - 9")
        }
    }

    for (let i = 0; i < secondNumber.length; i++) {
        if (!Number.isInteger(secondNumber[i])) {
            throw TypeError("Inputs should strictly be Integers")
        }
        if (secondNumber[i] < 0 || secondNumber[i] > 9) {
            throw RangeError("The values in the array should be 0 - 9")
        }
    }

    // Removing 0s at the start
    while (firstNumber[0] === 0) {
        firstNumber.shift()
    }

    while (secondNumber[0] === 0) {
        secondNumber.shift()
    }

    if (firstNumber.length === 0 || secondNumber.length === 0) {
        throw TypeError("Input must not be 0")
    }

    // Once all the checks are done, call this function
    return __simpleMultiply(firstNumber, secondNumber)
}

/**
 * @param {Array <Number>} firstNumber
 * @param {Array <Number>} secondNumber
 * @returns {Array <Number>} firstNumber * secondNumber
 */
function __simpleMultiply(firstNumber, secondNumber) {
    /**
     * @type {Number}
     * Index of how far we are, on the 2nd number
     */
    let secondNumIndex = 0

    /**
     * @type {Array<Array<Number>>}
     * The array of array that need to be added
     */
    let outputArray = []

    while (secondNumIndex < secondNumber.length) {
        /**
         * @type {Number}
         * This number is to be multiplied with the entire firstNumber
         */
        const currentMultiplier = secondNumber[secondNumber.length -
            secondNumIndex - 1]

        let currentResult = oneDigitMultiply(firstNumber, currentMultiplier)

        // Add the trailing 0s
        for (let trailing = 0; trailing < secondNumIndex; trailing++) {
            currentResult.push(0)
        }

        outputArray.push(currentResult)
        secondNumIndex++
    }

    return addAll(outputArray)
}


/**
 * Multiplies an array of numbers with 1 digit.
 * @param {Array<Number>} multiplicant The number to be multiplied
 * @param {Number} multiplier The digit that multiplies
 * @returns {Array<Number>} the result of multiplication
 */
function oneDigitMultiply(multiplicant, multiplier) {
    /**
     * @type {Number}
     * Carry of the previous multiplication
     */
    let carry = 0

    /**
     * @type {Array<Number>}
     * Stores the result of firstNum * currentMultiplier, 
     * with the trailing 0s too.
     */
    let currentResult = []


    // Loops over the multiplicant and accesses it in reverse order
    for (let multiplicantIndex = 0; multiplicantIndex < multiplicant.length;
        multiplicantIndex++) {

        let currentDigit = multiplier * multiplicant[multiplicant.length - 
            multiplicantIndex - 1] + carry
        
        carry = 0

        // Setting carry if there's need
        if (currentDigit > 9) {
            carry = Math.floor(currentDigit / 10)
            currentDigit = currentDigit % 10
        }
        currentResult.unshift(currentDigit)
    }

    if(carry) {
        currentResult.unshift(carry)
    }

    return currentResult
}


function testFunction() {
    console.log(multiply([9, 2, 0], [8, 8, 7]))
}

testFunction()