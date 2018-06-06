
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
// const cheerio = require("cheerio");

const routes =("./controller/scraper_controller.js");


const axios = require("axios");
// const db = require("./models");
const app = express();

let port = process.env.port || 1337; 

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.engine("handlebars", exphbs({     
    defaultLayout: "main"                                         
}));

app.set("view engine", "handlebars"); 



// app.use('/', routes);
// app.use(routes);


mongoose.connect("mongodb://localhost/scraperDB");

app.listen(port, function() {
    console.log("App up on port " + port);
});