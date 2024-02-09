/*
Problem - Write a function to implement Decimal Addition between two Arrays
 of 1 digit numbers each
*/

/**
 * @param {Array<Number>} firstNumber
 * @param {Array<Number>} secondNumber
 * @returns {Array<Number>} firstNumber + secondNumber
 * @throws {TypeError} for incorrect arguments
 * @throws {RangeError} if the values aren't 0 - 9 in each column
 * This function does the error handling part, and then calls the simpleAdd
 * function. simpleAdd is not expected to be public.
 */
function add(firstNumber, secondNumber) {
    // Check for correct arguments passed
    if (!Array.isArray(firstNumber) || !Array.isArray(secondNumber)
        || firstNumber.length === 0 || secondNumber.length === 0) {
        throw TypeError("The inputs should be Arrays of length > 0!")
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

    // REmoving 0s at the start
    while(firstNumber[0] === 0) {
        firstNumber.shift()
    }

    while(secondNumber[0] === 0) {
        secondNumber.shift()
    }

    // Once all the checks are done, call this function
    return __simpleAdd(firstNumber, secondNumber)
}


/**
 * @param {Array<Number>} firstNumber
 * @param {Array<Number>} secondNumber
 * @returns {Array<Number>} firstNumber + secondNumber
*/
function __simpleAdd(firstNumber, secondNumber) {
    /**
     * @type {0 | 1}
     * Carry 1 if the addition of 1 space is more than 9
     */
    let carry = 0

    /**
     * @type {Number}
     * to help keep track of till where we are done
     */
    let index = 0

    /**
     * @type {Array<Number>}
     * the output after addition
     */
    let outputArray = []
    // While both the numbers have that place's digit
    while (index < firstNumber.length && index < secondNumber.length) {
        // Sum this particular digit (starts from the last digit)
        let currentSum = firstNumber[firstNumber.length - index - 1] +
            secondNumber[secondNumber.length - index - 1] + carry

        // Set carry to 0 after addition
        carry = 0

        // Condition to set carry to 1
        if (currentSum >= 10) {
            carry = 1
            currentSum -= 10
        }

        outputArray.unshift(currentSum)
        index++
    }

    // If both the number aren't of the same length
    while (index < firstNumber.length) {
        let currentSum = firstNumber[firstNumber.length - index - 1] + carry
        carry = 0
        if (currentSum >= 10) {
            carry = 1
            currentSum -= 10
        }
        outputArray.unshift(currentSum)
        index++
    }

    while (index < secondNumber.length) {
        let currentSum = secondNumber[secondNumber.length - index - 1] + carry
        carry = 0
        if (currentSum >= 10) {
            carry = 1
            currentSum -= 10
        }
        outputArray.unshift(currentSum)
        index++
    }
    // if there is carry left
    if (carry) {
        outputArray.unshift(carry)
    }
    return outputArray
}

/** Simple function that tests the addition function */
function testFunction() {
    // Trailing carry case
    console.log(add([9, 9, 9, 9, 9, 9, 9], [9, 9, 9]).join(''))

    // Negative values case
    // console.log(add([-1, 0, 0], [8, 9, 2]))

    // Adding 0s at the start case
    console.log(add([0, 0, 0, 0, 1], [2, 3, 1]))
}

testFunction()