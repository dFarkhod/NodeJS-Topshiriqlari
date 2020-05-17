const myLib = require('../fizzBuzz');

describe('fizzBuzz', () => {
    it('should throw an error if input is not a number', () => {
        expect(() => { myLib.fizzBuzz('abc') }).toThrow();
        expect(() => { myLib.fizzBuzz(null) }).toThrow();
        expect(() => { myLib.fizzBuzz(undefined) }).toThrow();
    });

    it('should return Fizz if input is only divisible by 3', () => {
        const result = myLib.fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('should return Fizz if input is only divisible by 5', () => {
        const result = myLib.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });

    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = myLib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return input if input is not divisible by 3 or 5', () => {
        const result = myLib.fizzBuzz(2);
        expect(result).toBe(2);
    });

});