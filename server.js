
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

var port = 1337;

const db = require("./models");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraperDB");

app.get("/scrape"), function(req, res) {
    axios.get("http://www.fark.com").then(function(response) {
        var $ = cheerio.load(response.data);
        
    })
}










