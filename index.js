const express = require('express')
const app = express()
const port = 3001
const pg = require("pg");

//const merchant_model = require('./merchant_model')

const connection = require("./env.json");

// creates new connection pool
const Pool = pg.Pool;
const pool = new Pool(connection);
pool.connect().then(function () {
    console.log("Connected!");
});

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
/*
app.get('/', (req, res) => {
  merchant_model.getMerchants()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/merchants', (req, res) => {
  merchant_model.createMerchant(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
*/

app.post("/restaurants", function (req, res) {
    let body = req.body;
    
    // TODO run query to insert body into animals
    pool.query(
        `INSERT INTO restaurants(cuisine, name, website) 
        VALUES($1, $2, $3)
        RETURNING *`,
        [body.cuisine, body.name, body.website]
    ).then(function (response) {
        res.send()
        res.status(200)
    })
    .catch(function (error) {
        console.log(error);
        res.status(500);
        res.send();
    });
});

app.get("/droptable", function (req, res) {
  let body = req.body;
  
  pool.query(
      `DROP TABLE restaurants`
  ).then(function (response) {
      res.send()
      res.status(200)
  })
  .catch(function (error) {
      console.log(error);
      res.status(500);
      res.send();
  });
});

app.get("/createtable", function (req, res) {
  let body = req.body;
  
  pool.query(
      `CREATE TABLE restaurants(cuisine VARCHAR(75),name VARCHAR(75),website VARCHAR(75))`
  ).then(function (response) {
      res.send()
      res.status(200)
  })
  .catch(function (error) {
      console.log(error);
      res.status(500);
      res.send();
  });
});

app.get("/tableexists", function (req, res) {
  let body = req.body;
  
  pool.query(
      `SELECT to_regclass('public.restaurants');`
  ).then(function (response) {
      res.send(response.rows)
      res.status(200)
  })
  .catch(function (error) {
      console.log(error);
      res.status(500);
      res.send();
  });
});

app.get("/", function (req, res) {

    let cuisine = req.query.cuisine;
    let rows = null;

    pool.query(
        `SELECT * FROM restaurants WHERE cuisine = $1`,
        [cuisine]
    ).then(function (response) {
        //res.header("Content-Type", "application/json");
        //jsonData["rows"] = [];
        rows = response.rows;
        res.send(rows)
        res.status(200)
    })
    .catch(function (error) {
        console.log(error);
        res.status(500);
        res.send();
    });

});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})