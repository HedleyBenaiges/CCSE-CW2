// Requred for all APIs
// Create an instance of Express
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    'Content-Security-Policy', "default-src 'self';"
  )
  next();
})

// Instance of models
const db = require('./models')

// Creating tables in postgres
db.sequelize.sync().then(() => {
  app.listen(5000, () => { console.log("Server started on port 5000") })
})

// API Router
const Router = require('./api') // Local route to file
app.use("/", Router) // URI to make request