const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const user = new User({ isAdmin: true });
        const token = user.generateAuthToken();
        const decodedObject = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decodedObject).toMatchObject({ isAdmin: true });
    });
});