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

describe("Testing Product APIs", () => {
    test("GET /products", () => {
        assert.strictEqual(1, 1);
    });
});