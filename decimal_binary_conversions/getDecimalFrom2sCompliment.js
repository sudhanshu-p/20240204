/*
Task Description - Write a Javascript function that takes in an array of 
0s and 1s, and converts them to their respective decimal format
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


// Testing code
console.log(getDecimalFrom2sCompliment([1, 1, 0, 0, 1, 0, 1], true))