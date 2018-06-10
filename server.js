const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const routes = require("./controller/scraper_controller.js");
const app = express();

let port = process.env.port || 1337; 

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.engine("handlebars", exphbs({     
    defaultLayout: "main"                                         
}));

app.set("view engine", "handlebars"); 

app.use(routes);

mongoose.connect("mongodb://localhost/scraperDB");

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});