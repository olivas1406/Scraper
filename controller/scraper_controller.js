const express = require("express");
// const scraperModel = require("../models");
const router = express.Router();

const request = require("request");
const cheerio = require("cheerio");

const axios = require("axios");
const db = require("../models");



// app.get("/", function(req, res) {
//     scraperModel.selectAll(function(data) {
        
//         var articleData = {
//             article: data
//         };
//         res.render("index", articleData);
//     });
// });

router.get("/", function(req, res) {
    // scraperModel.selectAll(function(data) {
        db.selectAll(function(data) {

        
        var articleData = {
            article: data
        };
        res.render("index", articleData);
    });
});

router.get("/scrape", function(req, res) {


//     request("http://www.fark.com", function(error, response, html) {

//     var $ = cheerio.load(html);
//     var results = [];

//     $("span.headline").each(function(i, element) {

//     var link = $(element).children().attr("href");
//     var title = $(element).children().text();

//     results.push({
//       title: title,
//       link: link
//     });
//   });
//   console.log(results);
// });


    axios.get("http://www.fark.com").then(function(response) {

        console.log(response.data);

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
        // res.render("index", scrapedArt);
    });
});

router.get("/articles", function(req, res) {
    db.Article.find({}).then(function(allArt) {
        res.json(allArt);
    }).catch(function(err) {
        res.json(err);
    });
});

router.get("/articles/:id", function(req, res) {
    db.Article.findOne({_id: req.params.id}).populate("note").then(function(singleArt) {
        res.json(singleArt);
    }).catch(function(err) {
        res.json(err);
    });
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