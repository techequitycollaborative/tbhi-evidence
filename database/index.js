require('dotenv').config();

const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());

const port = process.env.PORT;
const Pool = require('pg').Pool;
const p = new Pool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  dialect: 'postgres',
  ssl: { rejectUnauthorized: false }
});
  
p.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log("Connected to Database!");
  });
});
  
app.get('/people', (req, res, next) => {
  p.query('select * from form.person')
    .then(data => {
      res.send(data.rows);
    });
});

app.listen(port, () => {
  console.log(`Database server is running on port ${port}.`);
});