describe('ArrayNums', () => {
    describe('__verifyInputData', () => {
        it('should throw a TypeError when input is not an array', () => {
            expect(() => ArrayNums.__verifyInputData(123)).toThrowError(TypeError);
        });

        it('should throw a TypeError when input array is empty', () => {
            expect(() => ArrayNums.__verifyInputData([])).toThrowError(TypeError);
        });

        it('should throw a TypeError when input contains non-integers', () => {
            expect(() => ArrayNums.__verifyInputData([1, 2, 'a'])).toThrowError(TypeError);
        });

        it('should throw a RangeError when input contains values outside 0-9', () => {
            expect(() => ArrayNums.__verifyInputData([1, 2, 10])).toThrowError(RangeError);
        });

        it('should remove leading zeros from the input array', () => {
            const result = ArrayNums.__verifyInputData([0, 0, 1, 2, 3]);
            expect(result).toBe(true);
        });

        it('should not modify the input array if it is valid', () => {
            const inputArray = [1, 2, 3];
            ArrayNums.__verifyInputData(inputArray);
            expect(inputArray).toEqual([1, 2, 3]);
        });
    });

    describe('__simpleSubtract', () => {
        it('should perform subtraction correctly', () => {
            const result = ArrayNums.__simpleSubtract([5, 2, 0], [2, 1, 2]);
            expect(result).toEqual([3, 0, 8]);
        });

        it('should handle borrowing correctly', () => {
            const result = ArrayNums.__simpleSubtract([1, 0, 0], [5, 0]);
            expect(result).toEqual([5, 0]);
        });

        it('should handle cases where the smaller number has leading zeros', () => {
            const result = ArrayNums.__simpleSubtract([5, 2, 0], [0, 2, 1, 2]);
            expect(result).toEqual([3, 0, 8]);
        });

        it('should handle cases where the bigger number has leading zeros', () => {
            const result = ArrayNums.__simpleSubtract([0, 5, 2, 0], [2, 1, 2]);
            expect(result).toEqual([3, 0, 8]);
        });
    });

    describe('__oneDigitMultiply', () => {
        it('should perform one-digit multiplication correctly', () => {
            const result = ArrayNums.__oneDigitMultiply([9, 1, 8, 2], 5);
            expect(result).toEqual([4, 5, 9, 1, 0]);
        });

        it('should handle carry correctly', () => {
            const result = ArrayNums.__oneDigitMultiply([9, 9, 9], 3);
            expect(result).toEqual([2, 9, 9, 7]);
        });

        it('should handle multiplication by zero correctly', () => {
            const result = ArrayNums.__oneDigitMultiply([9, 1, 8, 2], 0);
            expect(result).toEqual([0]);
        });

        it('should handle multiplication by one correctly', () => {
            const result = ArrayNums.__oneDigitMultiply([9, 1, 8, 2], 1);
            expect(result).toEqual([9, 1, 8, 2]);
        });
    });

    describe('__addAll', () => {
        it('should return [0] when input array is empty', () => {
            const result = ArrayNums.__addAll([]);
            expect(result).toEqual([0]);
        });

        it('should return the only element when input array has one element', () => {
            const result = ArrayNums.__addAll([[1, 2, 3]]);
            expect(result).toEqual([1, 2, 3]);
        });

        it('should perform addition of multiple arrays correctly', () => {
            const result = ArrayNums.__addAll([[1, 2], [3, 4], [5, 6]]);
            expect(result).toEqual([1, 0, 2]);
        });

        it('should handle arrays with different lengths correctly', () => {
            const result = ArrayNums.__addAll([[1, 2], [3], [4, 5, 6]]);
            expect(result).toEqual([4, 7, 1]);
        });

        it('should handle arrays with leading zeros correctly', () => {
            const result = ArrayNums.__addAll([[0, 1, 2], [0, 3, 4], [5, 6]]);
            expect(result).toEqual([1, 0, 2]);
        });
    });

    describe('__checkMaxMultiple', () => {
        it('should return the maximum multiple and remainder correctly', () => {
            const result = ArrayNums.__checkMaxMultiple([9, 8], [2, 3]);
            expect(result).toEqual([4, [6]]);
        });

        it('should handle cases where the divident is smaller than the divisor', () => {
            const result = ArrayNums.__checkMaxMultiple([1, 2], [3, 4]);
            expect(result).toEqual([0, [1, 2]]);
        });

        it('should handle cases where the divident is equal to the divisor', () => {
            const result = ArrayNums.__checkMaxMultiple([3, 4], [3, 4]);
            expect(result).toEqual([1, [0]]);
        });
    });

    describe('__getBiggerOfTwoNumArrays', () => {
        it('should return 1 when the first number is bigger', () => {
            const result = ArrayNums.__getBiggerOfTwoNumArrays([9, 8], [7, 6]);
            expect(result).toBe(1);
        });

        it('should return -1 when the second number is bigger', () => {
            const result = ArrayNums.__getBiggerOfTwoNumArrays([7, 6], [9, 8]);
            expect(result).toBe(-1);
        });

        it('should return 0 when both numbers are equal', () => {
            const result = ArrayNums.__getBiggerOfTwoNumArrays([7, 6], [7, 6]);
            expect(result).toBe(0);
        });

        it('should handle cases where both numbers have leading zeros', () => {
            const result = ArrayNums.__getBiggerOfTwoNumArrays([0, 0, 7, 6], [0, 0, 9, 8]);
            expect(result).toBe(-1);
        });

        it('should handle cases where one number has leading zeros', () => {
            const result = ArrayNums.__getBiggerOfTwoNumArrays([0, 0, 9, 8], [7, 6]);
            expect(result).toBe(1);
        });
    });

    describe('convertIntegerToArrayNum', () => {
        it('should convert integers to ArrayNums correctly', () => {
            const result = ArrayNums.convertIntegerToArrayNum(12345);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        it('should handle zero correctly', () => {
            const result = ArrayNums.convertIntegerToArrayNum(0);
            expect(result).toEqual([0]);
        });

        it('should handle large integers correctly', () => {
            const result = ArrayNums.convertIntegerToArrayNum(987654321);
            expect(result).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1]);
        });

        it('should handle negative integers correctly', () => {
            expect(() => ArrayNums.convertIntegerToArrayNum(-123)).toThrowError(RangeError);
        });
    });

    describe('addition', () => {
        it('should perform addition correctly', () => {
            const result = ArrayNums.addition([8, 9, 0], [0, 0, 0, 1]);
            expect(result).toEqual([8, 9, 1]);
        });

        it('should handle carry correctly', () => {
            const result = ArrayNums.addition([9, 9, 9], [1, 0, 0]);
            expect(result).toEqual([1, 0, 9, 9]);
        });

        it('should throw an error for invalid input', () => {
            expect(() => ArrayNums.addition([1, 2, 'a'], [3, 4])).toThrowError(TypeError);
            expect(() => ArrayNums.addition([1, 2, -1], [3, 4])).toThrowError(RangeError);
        });

        it('should handle addition of large numbers correctly', () => {
            const result = ArrayNums.addition([9, 9, 9, 9, 9, 9, 9, 9, 9], [1, 0, 0, 0, 0, 0, 0, 0, 0]);
            expect(result).toEqual([1, 0, 9, 9, 9, 9, 9, 9, 9, 9]);
        });
    });

    describe('subtract', () => {
        it('should perform subtraction correctly', () => {
            const result = ArrayNums.subtract([5, 2, 0], [2, 1, 2]);
            expect(result).toEqual([3, 0, 8]);
        });

        it('should handle negative results correctly', () => {
            const result = ArrayNums.subtract([2, 1, 2], [5, 2, 0]);
            expect(result).toEqual(['-', 3, 0, 8]);
        });

        it('should return [0] when both numbers are equal', () => {
            const result = ArrayNums.subtract([5, 2, 0], [5, 2, 0]);
            expect(result).toEqual([0]);
        });

        it('should throw an error for invalid input', () => {
            expect(() => ArrayNums.subtract([1, 2, 'a'], [3, 4])).toThrowError(TypeError);
            expect(() => ArrayNums.subtract([1, 2, -1], [3, 4])).toThrowError(RangeError);
        });

        it('should handle subtraction of large numbers correctly', () => {
            const result = ArrayNums.subtract([9, 9, 9, 9, 9, 9, 9, 9, 9], [1, 0, 0, 0, 0, 0, 0, 0, 0]);
            expect(result).toEqual([8, 9, 9, 9, 9, 9, 9, 9, 9]);
        });
    });

    describe('multiply', () => {
        it('should perform multiplication correctly', () => {
            const result = ArrayNums.multiply([9, 1, 8, 2], [8, 1, 0, 4, 8, 4, 7, 1, 6, 1]);
            expect(result).toEqual([7, 4, 4, 1, 8, 7, 0, 6, 6, 3, 2, 3, 0, 2]);
        });

        it('should handle multiplication by zero correctly', () => {
            const result = ArrayNums.multiply([9, 1, 8, 2], [0, 0, 0]);
            expect(result).toEqual([0]);
        });

        it('should throw an error for invalid input', () => {
            expect(() => ArrayNums.multiply([1, 2, 'a'], [3, 4])).toThrowError(TypeError);
            expect(() => ArrayNums.multiply([1, 2, -1], [3, 4])).toThrowError(RangeError);
        });

        it('should handle multiplication of large numbers correctly', () => {
            const result = ArrayNums.multiply([9, 9, 9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9, 9, 9, 9, 9, 9]);
            expect(result).toEqual([9, 9, 9, 9, 9, 9, 9, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
        });
    });

    describe('divide', () => {
        it('should perform division correctly', () => {
            const result = ArrayNums.divide([8, 1, 0, 4, 8, 4, 7, 1, 6, 1], [9, 1, 8, 2]);
            expect(result).toEqual({ Quotient: [8, 8, 2, 6, 8, 8], Remainder: [5, 9, 4, 5] });
        });

        it('should handle division by zero correctly', () => {
            expect(() => ArrayNums.divide([8, 1, 0, 4, 8, 4, 7, 1, 6, 1], [0])).toThrowError(Error);
        });

        it('should handle cases where divident is smaller than divisor', () => {
            const result = ArrayNums.divide([1, 2, 3], [9, 8, 7]);
            expect(result).toEqual({ Quotient: [0], Remainder: [1, 2, 3] });
        });

        it('should handle cases where divident is equal to divisor', () => {
            const result = ArrayNums.divide([9, 8, 7], [9, 8, 7]);
            expect(result).toEqual({ Quotient: [1], Remainder: [0] });
        });

        it('should throw an error for invalid input', () => {
            expect(() => ArrayNums.divide([1, 2, 'a'], [3, 4])).toThrowError(TypeError);
            expect(() => ArrayNums.divide([1, 2, -1], [3, 4])).toThrowError(RangeError);
        });

        it('should handle division of large numbers correctly', () => {
            const result = ArrayNums.divide([8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 1], [9, 9, 9, 9, 9, 9, 9, 9, 9]);
            expect(result).toEqual({ Quotient: [8, 8], Remainder: [8, 8, 8, 8, 8, 8, 8, 8, 9] });
        });

        it('should handle division of numbers with different lengths correctly', () => {
            const result = ArrayNums.divide([9, 9, 9, 0, 0, 0], [1, 0, 0, 0]);
            expect(result).toEqual({ Quotient: [9, 9, 9], Remainder: [0] });
        });

        it('should handle cases where the remainder is zero', () => {
            const result = ArrayNums.divide([9, 9, 9], [3, 3, 3]);
            expect(result).toEqual({ Quotient: [3], Remainder: [0] });
        });
    });
});