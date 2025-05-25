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
if (require.main === module) { // If run directly (for testing), ignore
  db.sequelize.sync().then(() => {
      app.listen(5000, () => { console.log("Server started on port 5000") })
  }).catch(err => {
      console.error("Unable to connect to the database:", err);
      process.exit(1); // Exit with failure
  });
}

// API Router
const Router = require('./api') // Local route to file
app.use("/", Router) // URI to make request

module.exports = app // Exporting app for testing