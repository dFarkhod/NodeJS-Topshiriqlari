const myLib = require('../mylib');
describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = myLib.absolute(1);
        expect(result).toBe(1);
    });

    it('should return a positive number if input is negative', () => {
        const result = myLib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return 0 if input is 0', () => {
        const result = myLib.absolute(0);
        expect(result).toBe(0);
    });
})
