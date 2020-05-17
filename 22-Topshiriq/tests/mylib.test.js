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
});


describe('salam', () => {
    it('should return the greeting message', () => {
        const result = myLib.salam('Farhod');
        //expect(result).toContain('Farhod');
        expect(result).toMatch(/Farhod/);
    });
});


describe('getCurrencies', () => {
    it('should return default currencies', () => {
        const result = myLib.getCurrencies();

        // o'ta umumiy test
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // o'ta aniq test
        expect(result[0]).toBe('UZS');
        expect(result[1]).toBe('MYR');
        expect(result[2]).toBe('TRY');
        expect(result.length).toBe(3);

        // to'g'ri uslubda yozilgan test
        expect(result).toContain('UZS');
        expect(result).toContain('TRY');
        expect(result).toContain('MYR');
        expect(result).toEqual(expect.arrayContaining(['MYR', 'UZS', 'TRY']));

    });
});


describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = myLib.getProduct(11);
        expect(result).toEqual({ id: 11, title: 'banana', price: 2 });
        expect(result).toMatchObject({ id: 11, price: 2 });
        expect(result).toHaveProperty('price', 2);
    });
});


describe('registerUser', () => {
    it('should throw error if userName is falsy', () => {
        // null, undefined, NaN, "", 0 va false
        const falsyItems = [null, undefined, NaN, "", 0, false];
        falsyItems.forEach(fi => {
            expect(() => { myLib.registeruser(fi) }).toThrow();
        });
    });

    it('should return a user object if valid username is passed', () => {
        const user = myLib.registeruser('admin');
        expect(user).toMatchObject({ userName: 'admin' });
        expect(user.id).toBeGreaterThan(0);
    });
});

