import pg from 'pg'
const { Client } = require('pg')

// PosetgreSQL connection
const client = new Client({
   user: 'postgres',
   password: null,
   host: 'localhost',
   port: '5432',
   database: 'SecureCartDB'
})

await client.connect()
.then(() => {console.log('Connected to the database')})
.catch((err) => {console.error('Error connecting to the database', err)})

const getUsers = (request, response) => {
   client.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
         throw error
      }
      response.status(200).json(results.rows)
   })
}

console.log(getUsers())