/*
Problem - Write a function to implement Decimal Subtraction by using 2 arrays
with each place being a 0 - 9 integer. Return an array with the output
Edge case - return an array with an attached - at the start for negative
outputs
Note - Not talking about negative inputs as of now.
*/

/**
 * @param {Array<Number>} firstNumber
 * @param {Array<Number>} secondNumber
 * @returns {Array<any>} firstNumber - secondNumber
 * @throws {TypeError} for incorrect arguments
 * @throws {RangeError} if the values aren't 0 - 9 in each column
 * This function does the error handling part and placing the argument in
 * correct order, and then calls the simpleSub function. 
 * simpleSub is not expected to be public.
 */
function subtract(firstNumber, secondNumber) {
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

    // Removing 0s at the start
    while (firstNumber[0] === 0) {
        firstNumber.shift()
    }

    while (secondNumber[0] === 0) {
        secondNumber.shift()
    }

    // Once all the checks are done, call this function
    // if (+firstNumber.join('') > +secondNumber.join('')) { CHEATING!
    //     return simpleSubtract(firstNumber, secondNumber)
    // }
    // else {
    //     const outputArray = simpleSubtract(secondNumber, firstNumber)
    //     outputArray.unshift('-')
    //     return outputArray
    // }

    // Case of firstNumber being greater in length
    if (firstNumber.length - secondNumber.length > 0) {
        return __simpleSubtract(firstNumber, secondNumber)
    }
    // Case of secondNumber being greater in length
    if (firstNumber.length - secondNumber.length < 0) {
        const outputArray = __simpleSubtract(secondNumber, firstNumber)
        outputArray.unshift('-')
        return outputArray
    }
    // Case of equal length, need to check digit by digit which is bigger
    for (let i = 0; i < firstNumber.length; i++) {
        // Case that firstNumber's digit is bigger
        if (firstNumber[i] > secondNumber[i]) {
            return __simpleSubtract(firstNumber, secondNumber)
        }
        // Case that secondNumber's digit is bigger
        if (firstNumber[i] < secondNumber[i]) {
            const outputArray = __simpleSubtract(secondNumber, firstNumber)
            outputArray.unshift('-')
            return outputArray
        }

        // Else loop through all the digits
    }

    // If the loop above ends, both the number are equal.
    return [0]
}

/**
 * @param {Array<Number>} biggerNumber 
 * @param {Array<Number>} smallerNumber 
 * @returns {Array<Number>} biggerNumber - smallerNumber
 * @private
 * Only called once all the checks are done, to perform the real logic
 */
function __simpleSubtract(biggerNumber, smallerNumber) {
    /**
     * @type {Number}
     * indicates whether there is a borrow
     */
    let borrow = 0
    /**
     * @type {Number}
     * used to keep track of current location
     */
    let index = 0

    /**
     * @type {Array <Number>}
     */
    let outputArray = []

    // Subtracts digit by digit until smaller number wears out
    while (index < biggerNumber.length && index < smallerNumber.length) {

        let currentNum = biggerNumber[biggerNumber.length - index - 1] -
            borrow - smallerNumber[smallerNumber.length - index - 1]
        borrow = 0

        // If the digit is negative, make it positive and switch borrow
        if (currentNum < 0) {
            currentNum += 10
            borrow = 1
        }

        outputArray.unshift(currentNum)
        index++
    }

    // Only bigger number can have remaining digits
    while (index < biggerNumber.length) {
        let currentNum = biggerNumber[biggerNumber.length - index - 1]
            - borrow
        borrow = 0

        if (currentNum < 0) {
            currentNum += 10
            borrow = 1
        }

        outputArray.unshift(currentNum)
        index++
    }

    // For trailing 0s
    while (outputArray[0] === 0) {
        outputArray.shift()
    }

    return outputArray
}


/** Simple function that tests the subtract function */
function testFunction() {
    // Trailing borrow case
    // console.log(subtract([8, 0, 0, 0, 0, 0, 0, 0], [7, 7, 7]).join(''))

    // // Trailing borrow case reversed + Unequal length switching
    // console.log(subtract([7, 7, 7], [8, 0, 0, 0, 0, 0, 0, 0]).join(''))

    // // Equal length switching
    // console.log(subtract([8, 0, 0], [8, 9, 1]).join(''))

    // Equal inputs case
    // console.log(subtract([1, 0], [1, 0]).join(''))

    // Adding 0s at the start case
    // console.log(subtract([0, 0, 0, 1, 0, 0], [9, 9]).join(''))
}

testFunction()