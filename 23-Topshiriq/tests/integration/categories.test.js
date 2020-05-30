const request = require('supertest');
let server;

describe('/api/categores', () => {
    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(() => {
        server.close();
    });
    describe('GET /', () => {
        it('should return all categories', async () => {
            const response = await request(server).get('/api/categories');
            expect(response.status).toBe(200);
        });
    });
});