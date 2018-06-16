const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const routes = require("./controller/scraper_controller.js");
const app = express();

const PORT = process.env.PORT || 3000; 

app.use(routes);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.engine("handlebars", exphbs({     
  defaultLayout: "main"                                         
}));

app.set("view engine", "handlebars"); 

// mongoose.connect("mongodb://localhost/articleScraper");

let MONGODB_URI = process.MONGODB_URI || "mongodb://localhost/articleScraper";

mongoose.connect("mongodb://scraperUser:scrapeMe1337@ds255930.mlab.com:55930/heroku_hlxt5c6q");

app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});