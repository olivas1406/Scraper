const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../models");

// Route for the homepage
router.get("/", function(req, res) {
    db.Article.find().sort({_id:1}).then(function(allArt) {  
        res.render("index", {articles: allArt});
        }).catch(function(err) {
            res.json(err);
        });
});

// Route for the scrape button
router.get("/scrape", function(req, res) {
    axios.get("http://www.fark.com").then(function(response) {
        var $ = cheerio.load(response.data);
        $("span.headline").each(function(i, element) {
            var result = {};
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");
            result.saved = false;
            db.Article.create(result).then(function(scrapedArt) {
            }).catch(function(err) {
                return res.json(err);
            });
        });
        console.log("Scrape Complete");
        res.redirect("/");
    });
});




/////////////////////////////////////////////   USE THIS TO SHOW ALL SAVED ARTICLES  //////////////
router.get("/articles", function(req, res) {
    db.Article.find({}).then(function(allArt) {
        res.json(allArt);
    }).catch(function(err) {
        res.json(err);
    });
});





// route to Save articles
router.get("/articles/:id", function(req, res) {
    db.Article.findOneAndUpdate({_id: req.params.id}, { $set: { saved: true}}, function() {
        console.log("Save Complete");
        res.redirect("/");
    }).catch(function(err) {
        res.json(err);
    })
});

router.post("/articles/:id", function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
        return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true});
    }).then(function(potato) {
        res.json(potato);        
    }).catch(function(err) {
        res.json(err);
    });
});

module.exports = router;