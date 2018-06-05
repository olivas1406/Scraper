
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
const db = require("./models");
const app = express();

let port = process.env.port || 1337; 

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraperDB");

app.get("/scrape"), function(req, res) {
    axios.get("http://www.fark.com").then(function(response) {
        var $ = cheerio.load(response.data);
        $("span.headline").each(function(i, element) {
            var result = {};
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");
            db.Article.create(result).then(function(scrapedArt) {
                console.log(scrapedArt);
            }).catch(function(err) {
                return res.json(err);
            });
        });
        res.send("Scrape Complete");
    });
};

app.get("/articles", function(req, res) {
    db.Article.find({}).then(function(allArt) {
        res.json(allArt);
    }).catch(function(err) {
        res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {
    db.Article.findOne({_id: req.params.id}).populate("note").then(function(singleArt) {
        res.json(singleArt);
    }).catch(function(err) {
        res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
        return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true});
    }).then(function(potato) {
        res.json(potato);
    }).catch(function(err) {
        res.json(err);
    });
});

app.listen(port, function() {
    console.log("App up on port " + port);
});