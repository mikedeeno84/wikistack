var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    models = require('../models'),
    Page = models.Page,
    User = models.User;

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.route('/')
    .get(function(req, res) {
        res.json({
            hello: "hello"
        });
    })
    .post(function(req, res) {
        // var userInfo = {
        //     name: req.body.author,
        //     email: req.body.email
        // }
        var pageInfo = {
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
        }
        var page = new Page(pageInfo)
        page.save()
            .then(function(data) {
                res.redirect(data.route);
            })
            .then(null, function(err) {
                console.log(err)
            });

    });

router.route("/:urlTitle")
    .get(function(req, res) {
        Page.findOne({
                urlTitle: req.params.urlTitle
            })
            .then(function(data) {
                console.log("Got here");
                res.render("wikipage", data);
            })
            .then(null, function(err) {
                console.error(err);
            });
    });

router.route("/add")
    .get(function(req, res) {
        res.render('addpage', {})
    });

module.exports = router;
