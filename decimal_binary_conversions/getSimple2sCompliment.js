/*
Task description - Write a JavaScript function to convert a number from
Decimal notation to 2s Complimented Binary Notation.
Note - We are not talking about floating points just yet
*/

/**
 * When the number cannot fit in the array size
 * @param {Number} number The number that is to be converted
 * @param {Number} numLen The desired output array size - 11 or 52
 * @param {Boolean} signBitRequired If the signbit is required or not
 * @returns {Array<Number>} The Number's representation in Binary 
 * @throws {TypeError} When the Input is not integer
 * @throws {RangeError} When the length expected is not 11 or 52 or
 */
function getSimple2sCompliment(number, numLen, signBitRequired = false) {
    // Checking Inputs for Integers
    if (!Number.isInteger(number) || !Number.isInteger(numLen)) {
        throw new TypeError("Input must be Integers.")
    }

    // Checking numLen for the correct lengths
    if (numLen !== 52 && numLen !== 11) {
        throw new RangeError("Length of output must be 11 or 52.")
    }

    // Checking if number is in range
    if (number > Math.pow(2, numLen - 1)) {
        throw new RangeError("The number is too huge for this size.")
    }

    let signBit;

    // If the number is negative, turn the sign bit, 
    // and make the number positive
    if (number < 0) {
        signBit = 1
        number *= -1
        number -= 1
    }
    else {
        signBit = 0
    }

    // Get Binary representation of a positive number
    const outputArray = __getBinary(number, numLen - (signBitRequired ? 1 : 0))

    if (signBitRequired) {
        outputArray.unshift(signBit)
    }

    return outputArray
}


/**
 * 
 * @param {Number} inputNumber The Decimal Input
 * @param {Number} binaryLen The Length of expected binary output
 * @returns {Array<Number>} The output Binary Array
 */
function __getBinary(inputNumber, binaryLen) {
    const outputArray = []
    for (let currentBit = binaryLen - 1; currentBit >= 0; currentBit--) {
        if (inputNumber >= Math.pow(2, currentBit)) {
            outputArray.push(1)
            inputNumber -= Math.pow(2, currentBit)
            continue
        }
        else {
            outputArray.push(0)
        }
    }
    return outputArray
}

// Testing code
for (let i = 0; i < 10; i++) {
    const range = 1000
    const testCase = -(range / 2) + Math.floor(Math.random() * range)
    console.log("For input " + testCase + ": " + getSimple2sCompliment(testCase, 11, true))
}
