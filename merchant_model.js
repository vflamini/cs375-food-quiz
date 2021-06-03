// imports database environment variables
const connection = require("./env.json");

// creates new connection pool
const Pool = require('pg').Pool;
const pool = new Pool(connection);
pool.connect().then(function () {
    console.log("Connected!");
});

const getMerchants = () => {
    //return new Promise(function(resolve, reject) {
      pool.query(`SELECT * FROM restaurants`, (error, results) => {
        //if (error) {
          //reject(error)
        //}
        //resolve(results.rows);
      })
    //}) 
  }
  const createMerchant = (body) => {
    //return new Promise(function(resolve, reject) {
      const { cuisine, name, website } = body
      pool.query(`INSERT INTO restaurants (cuisine, name, website) VALUES ($1, $2, $3) RETURNING *`, [cuisine, name, website], (error, results) => {
        //if (error) {
          //reject(error)
        //}
        //resolve(`A new merchant has been added added: ${results.rows[0]}`)
      })
    //})
  }
  const deleteMerchant = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Merchant deleted with ID: ${id}`)
      })
    })
  }
  
  module.exports = {
    getMerchants,
    createMerchant,
    deleteMerchant,
  }