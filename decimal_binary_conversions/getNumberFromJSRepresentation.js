/*
Task Description - Write a Javascript function that takes in an array 
of 64 bits, which is the Javascript representation, and returns the
Decimal representation of the number.
*/

/**
 * @param {Array<Number>} binaryRepresentation 2s complimented Binary rep
 * @param {Boolean} signBitExists is there a signBit?
 * @returns {Number} the number in Decimal Format
 * @throws {TypeError} when the array is not of 0s and 1s
 */
function getDecimalFrom2sCompliment(binaryRepresentation, signBitExists = true) {
    // Check if input is Array
    if (!Array.isArray(binaryRepresentation)) {
        throw new TypeError("Input must be an array.")
    }

    // If SignBit exists, remove it before processing further
    if (signBitExists) {
        const signBit = binaryRepresentation.shift()
        if (signBit === 1) {
            return -1 * __convertBinaryToDecimal(binaryRepresentation) - 1
        }
        return __convertBinaryToDecimal(binaryRepresentation)
    }

    return __convertBinaryToDecimal(binaryRepresentation)
}


/**
 * Simply converts a Binary into decimal
 * @param {Array<Number>} binaryRepresentation The number in Binary
 * @returns {Number} The Decimal format of the number
 * @throws {TypeError} when the array is not of 0s and 1s
 */
function __convertBinaryToDecimal(binaryRepresentation) {
    let decimalNumber = 0
    for (let index = 0; index < binaryRepresentation.length; index++) {
        if (binaryRepresentation[index] === 1) {
            decimalNumber += Math.pow(2, binaryRepresentation.length - index - 1)
        }
        else if (binaryRepresentation[index] !== 0) {
            throw new TypeError("The array should only contain 0s and 1s.")
        }
    }
    return decimalNumber
}


/**
 * Converts a number's JavaScript's binary representation into it's Decimal,
 * Human readable counterpart
 * @param {Array<Number>} jsRepresentation - The JS representation
 * @returns {Number} - The decimal representation
 */
function getNumberFromJSRepresentation(jsRepresentation) {
    // Take the signbit out first
    const signBit = jsRepresentation[0]

    // Now, the next 11 bits should be the Exponent
    const binaryExponent = []
    for (let i = 1; i < 12; i++) {
        binaryExponent.push(jsRepresentation[i])
    }

    // From 13, the rest of the array is Mantissa.
    const binaryMantissa = []
    for (let i = 13; i < jsRepresentation.length; i++) {
        binaryMantissa.push(jsRepresentation[i])
    }

    // Once broken down into pieces, we can interpret them

    const decimalExponent = getDecimalFrom2sCompliment(binaryExponent, true)
    const decimalMantissa = getDecimalFrom2sCompliment(binaryMantissa, false)

    const decimalRepresentation = Math.pow(-1, signBit) * decimalMantissa *
        Math.pow(2, decimalExponent)

    return decimalRepresentation
}

console.log(getNumberFromJSRepresentation(
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,        // 12
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,     // 24
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,     // 36
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,     // 48
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,     // 60
        0, 0, 0, 1]
))