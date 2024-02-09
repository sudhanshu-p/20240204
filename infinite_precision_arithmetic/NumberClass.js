/* 
Problem - Create a class of Number that stores numbers in the form of arrays
Each position in the array consists of a single digit from 0 - 9.
Hence there is no limits on the space, only limits on the system's size, 
which is upto the end user.
Class methods - add, subtract, multiply, divide
These are the main methods. 
Apart from these, we can have many different internal methods.
Variables - None.
All the methods will be static.
*/

/** An ArrayNum is a Number, being stored in the form of an array, to exceed
 * the limitations of 64 bits.
 * @method addition - Adds two ArrayNums
 * @method subtract - Subtracts two ArrayNums
 * @method multiply - Multiplies two ArrayNums
 * @method divide - Divides two ArrayNums
 * @author Sudhanshu
 */
class ArrayNums {
	/** This function does the error handling part that is common for all the
	 * operations.
	 * @private
	 * @param {Array<Number>} testingNumber
	 * @throws {TypeError} for incorrect arguments
	 * @throws {RangeError} if the values aren't 0 - 9 in each column
	 */
	static __verifyInputData(testingNumber) {
		// Check if input is Array
		if (!Array.isArray(testingNumber)) {
			throw TypeError("The inputs should be Arrays!")
		}

		// Check if array is empty
		if (testingNumber.length === 0) {
			throw TypeError("Input must not be empty!")
		}

		// Check if all inputs are integer and in range
		for (let i = 0; i < testingNumber.length; i++) {
			if (!Number.isInteger(testingNumber[i])) {
				throw TypeError("Inputs should strictly be Integers")
			}
			if (testingNumber[i] < 0 || testingNumber[i] > 9) {
				throw RangeError("The values in the array should be 0 - 9")
			}
		}

		// Remove 0s from the left, unless there's only 1 left
		while (testingNumber[0] === 0 && testingNumber.length > 1) {
			testingNumber.shift()
		}

		return true
	}

	/** Takes in ordered input and returns the subtracted output
	 * @private
	 * @param {Array<Number>} biggerNumber - The bigger number amongst the two
	 * @param {Array<Number>} smallerNumber - The smaller number
	 * @returns {Array<Number>} The output of biggerNumber - smallerNumber
	 */
	static __simpleSubtract(biggerNumber, smallerNumber) {
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

	/** Multiplies an array of numbers with 1 digit.
	 * @private
	 * @param {Array<Number>} multiplicant The number to be multiplied
	 * @param {Number} multiplier The digit that multiplies
	 * @returns {Array<Number>} the result of multiplication
	 */
	static __oneDigitMultiply(multiplicant, multiplier) {
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

		if (carry) {
			currentResult.unshift(carry)
		}

		return currentResult
	}

	/** Takes in an array of arrays, and outputs the result of adding them all
	 * @private
	 * @param {Array<Array<Number>>} arrayOfArrays 
	 * @returns {Array<Number>} The result of addition
	 */
	static __addAll(arrayOfArrays) {
		// Checking for lengths
		if (arrayOfArrays.length === 0) {
			return [0]
		}
		if (arrayOfArrays.length === 1) {
			return arrayOfArrays[0]
		}
		/**
		 * @type {Array<Number>} the array containing all sums.
		 */
		let outputArray = ArrayNums.addition(arrayOfArrays[0], arrayOfArrays[1])

		let index = 2
		while (index < arrayOfArrays.length) {
			outputArray = ArrayNums.addition(outputArray, arrayOfArrays[index])
			index++
		}

		return outputArray
	}

	/** Checks for the maximum permissible times we can safely divide
	 * divident with divisor
	 * @param {Array<Number>} divident
	 * @param {Array<Number>} divisor
	 * @returns {Array<Array<Number>>} 0th Index is Quotient(Number), 
	 * 1st Index is Remainder (Array<Number>)
	 */
	static __checkMaxMultiple(divident, divisor) {
		// Data here would already be verified, so we need not do it again

		/**
		 * @type {Number} The output is stored here
		 */
		let maxSafeTimes = 1

		// Run until the value reaches 10
		while (maxSafeTimes < 11) {
			const result = ArrayNums.subtract(divident,
				ArrayNums.__oneDigitMultiply(divisor, maxSafeTimes))

			// This indicates overkill has occured, so return with last 
			// maximum value
			if (result[0] === "-") {
				return [maxSafeTimes - 1, ArrayNums.subtract(divident,
					ArrayNums.__oneDigitMultiply(divisor, maxSafeTimes - 1))]
			}
			maxSafeTimes += 1
		}

		// We are dividing the number in such a way that maxSafeTimes cannot
		// be a 2 digit number. If it is, we throw an error.
		throw new Error("Unknown error occured. Please try again")
	}

	/** Takes 2 NumArrays as input, and returns 1 if first is bigger,
	 * 0 if they are equal, and -1 if 2nd is bigger
	 * @param {Array<Number>} firstNumber 
	 * @param {Array<Number>} secondNumber 
	 * @returns {Number} -1, 0 or 1
	 */
	static __getBiggerOfTwoNumArrays(firstNumber, secondNumber) {
		// Only intended to be used after verification is complete.

		// Case of firstNumber being greater in length
		if (firstNumber.length - secondNumber.length > 0) {
			return 1
		}

		// Case of secondNumber being greater in length
		if (firstNumber.length - secondNumber.length < 0) {
			return -1
		}

		// Case of equal length, need to check digit by digit which is bigger
		for (let i = 0; i < firstNumber.length; i++) {
			// Case that firstNumber's digit is bigger
			if (firstNumber[i] > secondNumber[i]) {
				return 1
			}
			// Case that secondNumber's digit is bigger
			if (firstNumber[i] < secondNumber[i]) {
				return -1
			}

			// Else loop through all the digits
		}

		// If the loop above ends, both the number are equal.
		return 0
	}

	/** Adds the 2 given ArrayNums
	 * @param {Array<Number>} firstNumber
	 * @param {Array<Number>} secondNumber
	 * @returns {Array<Number>} firstNumber + secondNumber
	*/
	static addition(firstNumber, secondNumber) {
		ArrayNums.__verifyInputData(firstNumber)
		ArrayNums.__verifyInputData(secondNumber)
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

	/** Subtracts the second argument from the first.
	 * @param {Array<Number>} firstNumber
	 * @param {Array<Number>} secondNumber 
	 * @returns {Array<Number>} firstNumber - secondNumber
	 */
	static subtract(firstNumber, secondNumber) {
		ArrayNums.__verifyInputData(firstNumber)
		ArrayNums.__verifyInputData(secondNumber)

		switch (ArrayNums.__getBiggerOfTwoNumArrays(firstNumber,
			secondNumber)) {
			// secondNumber > firstNumber
			case -1:
				const outputArray = ArrayNums.__simpleSubtract(secondNumber, firstNumber)
				outputArray.unshift('-')
				return outputArray
				break
			// The numbers are equal
			case 0:
				return [0]
				break
			// firstNumber > secondNumber
			case 1:
				return ArrayNums.__simpleSubtract(firstNumber, secondNumber)
				break
		}
	}

	/** Multiplies two given ArrayNums
	 * @param {Array <Number>} firstNumber
	 * @param {Array <Number>} secondNumber
	 * @returns {Array <Number>} firstNumber * secondNumber
	 */
	static multiply(firstNumber, secondNumber) {
		ArrayNums.__verifyInputData(firstNumber)
		ArrayNums.__verifyInputData(secondNumber)

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

			if (currentMultiplier === 0) {
				secondNumIndex++
				continue
			}
			let currentResult = ArrayNums.__oneDigitMultiply(firstNumber, currentMultiplier)

			// Add the trailing 0s
			for (let trailing = 0; trailing < secondNumIndex; trailing++) {
				currentResult.push(0)
			}

			outputArray.push(currentResult)
			secondNumIndex++
		}

		return ArrayNums.__addAll(outputArray)
	}

	/** Divides two given ArrayNums
	 * @param {Array<Number>} divident - The divident for the operation
	 * @param {Array<Number>} divisor - The divisor for the operation
	 * @returns {{"Quotient": Array<Number>, "Remainder": Array<Number>}}
	 * An Object that stores the Quotient and Remainder
	 * @throws {Error} When divisor is 0
	 */
	static divide(divident, divisor) {
		ArrayNums.__verifyInputData(divident)
		ArrayNums.__verifyInputData(divisor)


		// Division by 0 case
		if (divisor[0] === 0) {
			throw Error("Cannot divide by 0")
		}

		// We want divident > divisor, otherwise the divident is remainder
		if (ArrayNums.__getBiggerOfTwoNumArrays(divident, divisor) === -1) {
			return { "Quotient": [0], "Remainder": divident }
		}

		// In case they are equal, return quotient as 1 and remainder 0
		if (ArrayNums.__getBiggerOfTwoNumArrays(divident, divisor) === 0) {
			return { "Quotient": [1], "Remainder": [0] }
		}

		/**
		 * This variable shows till where the division has progressed
		 * We start with divident having same length as divisor
		*/
		let indexOnDivident = divisor.length

		/**
		 * This variable stores the part of the array currently to divide
		 * Initially, holds exactly as many numbers as the divisor.
		 */

		// This create a shallow copy of divident
		let currentDivident = [...divident]

		// We cannot operate on the entire divident at a tme, so we break
		// it down into smaller parts
		currentDivident = currentDivident.splice(0, indexOnDivident)

		/** This array stores the quotient in the form of an ArrayNum */
		let quotientArray = []

		/** This array stores the remainder in the form of an ArrayNum*/
		let remainder = []

		/** iteratively adding a digit to currentDividend */
		while (indexOnDivident <= divident.length ||
			ArrayNums.__getBiggerOfTwoNumArrays(remainder, divisor) === 1
		) {

			/* Calling the function with part of divident */
			let tempArray = ArrayNums.__checkMaxMultiple(
				currentDivident, divisor
			)

			/* Temporarily stores 1 digit of quotient */
			let quotient = tempArray[0]
			remainder = tempArray[1]
			// The remainder becomes the new divident
			currentDivident = [...remainder]

			// The quotient is added to be stored
			quotientArray.push(quotient)

			// Adding a new digit onto the current Divident
			currentDivident.push(divident[indexOnDivident])
			indexOnDivident += 1
		}

		// Remove starting 0s from quotientArray
		while (quotientArray[0] === 0) {
			quotientArray.shift()
		}

		// Remove trailing undefineds from remainder
		while (remainder[remainder.length - 1] === undefined) {
			remainder.pop()
		}

		return { "Quotient": quotientArray, "Remainder": remainder }
	}

	/** Convert a number into an ArrayNum
	 * @param {Number} inputNumber
	 * @return {Array<Number>} inputNumber converted into ArrayNum
	 */
	static convertIntegerToArrayNum(inputNumber) {
		let outputArray = []
		while (inputNumber > 0) {
			outputArray.push(inputNumber % 10)
			inputNumber = Math.floor(inputNumber / 10)
		}
		return outputArray.reverse()
	}

	/** A simple function to test all of the methods */
	static testingFunction() {
		// console.log(ArrayNums.addition([8, 9, 0], [0, 0, 0, 1]))
		// console.log(ArrayNums.subtract([5, 2, 0], [2, 1, 2]))
		// console.log(ArrayNums.multiply([9, 1, 8, 2],
		// 	[8, 1, 0, 4, 8, 4, 7, 1, 6, 1]))
		// console.log(ArrayNums.divide([8, 1, 0, 4, 8, 4, 7, 1, 6, 1],
		// 	[9, 1, 8, 2]))

		for (let i = 0; i < 100; i++) {
			let inputOne = 1 + Math.floor(Math.random() * 1000)
			let inputTwo = 1 + Math.floor(Math.random() * 100)
			// console.log(`For input ${inputOne}, -> 
			// 	${ArrayNums.convertIntegerToArrayNum(inputOne)}`)
			let output = ArrayNums.divide(
				ArrayNums.convertIntegerToArrayNum(inputOne),
				ArrayNums.convertIntegerToArrayNum(inputTwo))
			console.log("For Inputs: inputOne = " + inputOne +
				" And inputTwo = " + inputTwo + " -> Quotient = "
				+ output["Quotient"].join("") + " And Remainder = "
				+ output["Remainder"].join("")
			)
		}

	}
}

ArrayNums.testingFunction()