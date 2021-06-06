const pg = require("pg");
const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

app.use(express.json());
app.use(express.static("public_html"));

// imports database environment variables
const connection = require("/env.json");

// creates new connection pool
const Pool = pg.Pool;
const pool = new Pool(connection);
pool.connect().then(function () {
    console.log("Connected!");
});



app.get("/", function (req, res) {
    $.ajax({
        url: "/RestaurantList.csv",
        async: false,
        success: function (csvd) {
            data = $.csv.toArrays(csvd);
            console.log(array)
        },
        dataType: "text",
        complete: function () {
            // call a function on complete 
        }
    });
    res.send();
});

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});