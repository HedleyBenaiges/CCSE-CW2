require('dotenv').config();
const express = require('express') 
const router = express.Router()
const { products, users } = require('./models') // Imports products table from database
const { Op, where } = require("sequelize"); // Sequelize operators (for like)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // get authorization header
    // Header in format: 'Bearer <TOKEN>'

    // && operator stops if authHeader is not null
    const token = authHeader && authHeader.split(" ")[1]; // return token

    // Was:
    // if (token === null) return res.sendStatus(401); // No token
    // Now:
    if (token === null) return res.sendStatus(401); // No token

    // Verify token with ACCESS_TOKEN_SECRET from .env file
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user;
        next(); // Passes back to the function that called it
    });
};

// ================== un-privileged users ===================
// ------------------      Products:      -------------------
    //  (Done)  Get all products
    //  (Done)  Get a single product (by ID)
    //  (Done)  Search products (Get all %like%)

// Get all products from database
// Orders by discounts to promote items
router.get("/products/", async (req, res) => {
    const _products = await products.findAll({
        order: [['discount', 'DESC']]
    })
    res.json(_products)
});

// Get product by ID
router.get("/products/:id", async (req, res) => {
    try {
        const _product = await products.findByPk(req.params.id);
        res.json(_product);
    } catch (error) { return res.json(null) }; // If malformed ID
    // Returns null so client can handle it as 'product not found'
});

// TODO: following line
// if (_products === null) return res.sendStatus(401); // If no product found


// Takes "product_name" value from post request
// Return all products with similar name (iLike = case insensitive)
router.post("/products/search", async (req, res) => {
    const _products = await products.findAll({
        where: { product_name: { [Op.iLike]: `%${req.body.product_name}%` } }
    });
    res.json(_products)
    // TODO: Add sort by price, discount, etc.
});

// ------------------        Users:       -------------------
    // (Done) Register account (Create User)
    // (Done) Log in

// Register Account
router.post("/users/register", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Generate salt
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    // Generate hash
    const hash = bcrypt.hashSync(password, salt);

    // Send to database
    await users.create({ email: email, password: hash, privilege: 0 });

    // Respond successful
    res.sendStatus(201);
});

// Log in
router.post("/users/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const _user = await users.findOne({
        //privilige: 0 = user, 1 = admin
        attributes: ['password', 'user_id', 'privilege'],
        where: { email: email }
    });

    // Prevents the server from crashing if no user is found
    if (!_user) return res.sendStatus(401); // If no user found

    const payload = { user_id: _user.user_id, email: email, privilege: _user.privilege };

    // TODO: Server not finding ACCESS_TOKEN_SECRET
    if (!process.env.ACCESS_TOKEN_SECRET) return res.sendStatus(500); // If no secret found

    if (bcrypt.compareSync(password, _user.password)) {
        // If passwords match, it will create a JWT for the user
        // Signs the JWT with ACCESS_TOKEN_SECRET from .env file
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
    } else { res.sendStatus(401); }// If password is incorrect
});

// ================== Logged In Users ====================
    // Log out
    // Change passwd
    // Edit details
// Orders
    // Post order request
    // Get previous orders


// =================== Admin APIs =======================
// All admin APIs are accessed via /admin/...
// ------------------      Products:      -------------------
    // (Done) Create new product
    // (Done) Update product (discount, stock)
    // (Done) Delete product

router.post("/admin/products/addnew", authenticateToken, async (req, res) => {
    // Was: loose equality check
    // if (req.user.privilege !== 1) return res.sendStatus(403);
    // Now: strict equality check
    if (req.user.privilege !== 1) return res.sendStatus(403); // If not admin
    const product = req.body;
    await products.create(product);
    res.json(product);
   });

router.post("/admin/products/update", authenticateToken, async (req, res) => {
    if (req.user.privilege !== 1) return res.sendStatus(403); // If not admin
    // Should be accessed on single item page, with admin session active
    // Fills all client-side forms with the return of /product/:id/
    // These values should be used by default - Updates everything, 
    const product = req.body;
    await products.update({
        product_name: product.product_name,
        product_description: product.product_description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        discount: product.discount, 
      }, { where: { product_id: product.product_id } }
    );
    res.json(product);
});

router.post("/admin/products/delete", authenticateToken, async (req, res) => {
    if (req.user.privilege !== 1) return res.sendStatus(403); // If not admin
    // Should also be accessed on single item page
    const product = req.body;
    await products.destroy({ 
        where: { product_id: product.product_id } 
    });
    res.json(product);
});

// ------------------      Users:      -------------------
    // Get all users
    // Get single user
    // Remove user account
// Get all users
router.get("/admin/users/", authenticateToken, async (req, res) => {
    if (req.user.privilege !== 1) return res.sendStatus(403); // If not admin
    const _users = await users.findAll({
        order: [['user_id', 'ASC']]
    })

    res.json(_users);
});

// Orders:
    // Get all orders
    // Get a single order

module.exports = router