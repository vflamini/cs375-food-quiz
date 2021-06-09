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

restaurantList = [
  ["Italian","La Fontana Della Citta","https://www.lafontanadellacitta.com/"],
  ["Italian","Maggiano's Little Italy","https://www.maggianos.com/?campaign=brand&gclid=CjwKCAjwnPOEBhA0EiwA609RefGTSZKmSKJk48WC4mscbyreolT6JDmIUn_F6Zu2HfbbrWSFuVLs2hoC0PkQAvD_BwE"],
  ["Italian","Osteria","https://www.osteriaphilly.com/"],
  ["Italian","Giorgio On Pine","http://www.giorgioonpine.com/"],
  ["Italian","Pietro's Italian","https://pietrospizza.com/"],
  ["Mexican","Distrito","https://www.distritophilly.com/"],
  ["Mexican","Rosy's Taco Bar","https://rosystacobar.com/"],
  ["Mexican","Mission Taqueria","https://www.missiontaqueria.com/"],
  ["Mexican","El Vez","https://elvezrestaurant.com/?utm_source=Google%20My%20Business&utm_medium=Website%20Button"],
  ["Mexican","El Ray","https://elreyrestaurant.com/?utm_source=Google%20My%20Business&utm_medium=Website%20Button"],
  ["Chinese","Han Dynasty","https://handynasty.net/"],
  ["Chinese","Sang Kee Noodle House","https://sangkeenoodlehouse.com/"],
  ["Chinese","Dim Sum & Noodle","https://www.dimsumandnoodle.com/"],
  ["Chinese","Mandarin Palace","https://www.phillymandarinpalace.com/?utm_source=gmb&utm_medium=website"],
  ["Chinese","Nom Wah ","https://nomwah.com/"],
  ["Indian","Tiffin Indian Cuisine","https://order.tiffin.com/"],
  ["Indian","Veda","https://vedaphilly.com/"],
  ["Indian","Ekta Indian Cuisine","https://www.ektaindianrestaurant.com/"],
  ["Indian","Ateethi","http://ateethirestaurantpa.com/"],
  ["Indian","Thanal Indian Tavern","https://www.thanalphilly.com/"],
  ["American","New Deck Tavern","https://www.newdecktavern.com/"],
  ["American","White Dog Cafe","https://whitedog.com/location/?University-City-1"],
  ["American","Butcher Bar","http://www.butcherbarphilly.com/"],
  ["American","Yards Brewing Company","https://yardsbrewing.com/"],
  ["American","The Love.","https://theloverestaurant.com/?utm_source=Google%20My%20Business&utm_medium=Website%20Button"],
  ["Healthy","The Quick Fixx","https://thequickfixx.com/"],
  ["Healthy","P.S. & Co.","https://www.puresweets.com/"],
  ["Healthy","Just Salad","https://www.justsalad.com/"],
  ["Healthy","Freshii","https://www.freshii.com/ca/en-ca/home"],
  ["Healthy","Crisp Kitchen","https://www.crispkitchen.com/"],
  ["Sushi","Crazy Shushi","https://www.phillycrazysushi.com/"],
  ["Sushi","Morimoto","https://morimotorestaurant.com/"],
  ["Sushi","Pod","https://podrestaurant.com/?utm_source=Google%20My%20Business&utm_medium=Website%20Button"],
  ["Sushi","Zama","http://www.zamaphilly.com/"],
  ["Sushi","Double Knot","https://www.doubleknotphilly.com/"]
];

pool.query(`SELECT EXISTS (SELECT 1 FROM restaurants)`,(err,res)=>{
  if (res == null){
    pool.query(`CREATE TABLE restaurants (cuisine VARCHAR(25), name VARCHAR(25), website VARCHAR(250))`,(err,res)=>{
      console.log(err,res)
    });
  }
});

for(var i = 0; i < restaurantList.length; i++) {
  pool.query(
    `INSERT INTO restaurants(cuisine, name, website) 
    VALUES($1, $2, $3)
    RETURNING *`,
    [restaurantList[i][0], restaurantList[i][1], restaurantList[i][2]]
)};

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
    console.log(body);
    res.send();
});

app.get("/", function (req, res) {
    // TODO extract species from query
    let cuisine = req.query.cuisine;
    let rows = null;
    // TODO run query selecting all animals with species
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
    // TODO return rows to user
    //res.send(rows);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})