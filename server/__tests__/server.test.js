const assert = require('assert/strict'); // Keep this for assertions
// const { describe, it } = require('node:test');
const request = require('supertest');
const app = require('../server'); // Imported from server.js
const { products, users } = require('../models') // Imports products table from database
const sequelize = require('../models').sequelize; // Sequelize instance for database connection
const POSTGRES_USER = 'postgres';
const POSTGRES_PASSWORD = 'postgres';
const POSTGRES_DB = 'securecartdb';

// beforeAll(async () => {
//     await sequelize.sync({ force: true }); // Reset database before tests
// });

describe('GET /products', () => {
    test('should return a list of products', async () => {
        const res = await request(app).get('/products/');
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /products/:id', () => {
    test('should return a product where ID = 1', async () => {
        const res = await request(app).get('/products/1'); // Assuming product with ID 1 exists
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('product_id');
        expect(res.body).toHaveProperty('product_name');
        expect(res.body).toHaveProperty('product_description');
    });

    test('should return null for non-existent product', async () => {
        const res = await request(app).get('/products/9999'); // Assuming this ID does not exist
        expect(res.body).toEqual(null);
    });

    test('should return null for malformed ID (special character)', async () => {
        const res = await request(app).get('/products/$'); // Malformed ID
        expect(res.body).toEqual(null); // Should return null as per the API design
    });
});

describe('POST /products/search', () => {
    test('should return products matching the search term', async () => {
        const res = await request(app)
            .post('/products/search')
            .send({ product_name: 'test' }); // Assuming 'test' is part of a product name
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true); // Should return an array of products
    });

    test('should return an empty array for non-matching search term', async () => {
        const res = await request(app)
            .post('/products/search')
            .send({ product_name: 'nonexistentproduct' }); // Assuming this product does not exist
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]); // Should return an empty array
    });
});


// afterAll(async () => {
//     await sequelize.close(); // Close the database connection after tests
// });