const assert = require('assert/strict'); // Keep this for assertions
const { describe, it } = require('node:test');
const request = require('supertest');
const app = require('../server'); // Imported from server.js

describe('GET /products/', () => {
    it('should return a list of products', async () => {
        const response = await request(app).get('/products/');
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.headers['content-type'], (/json/)); // Assuming there are 10 products in the database
    })
});

describe('GET /products/1', () => {
    it('should return a list of products', async () => {
        const response = await request(app).get('/products/');
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.headers['content-type'], (/json/)); // Assuming there are 10 products in the database
    })
});

describe('GET /products/$', () => {
    it('should return null', async () => {
        const response = await request(app).get('/products/');
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.headers['content-type'], (/json/)); // Assuming there are 10 products in the database
        assert.strictEqual(response.body, null); // Assuming there are 10 products in the database
    })
});

describe('GET /products/$', () => {
    it('should fail', async () => {
        const response = await request(app).get('/products/');
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.headers['content-type'], (/json/)); // Assuming there are 10 products in the database
        assert.strictEqual(response.body, 'druing'); // Assuming there are 10 products in the database
    })
});

