var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    models = require('../models'),
    Page = models.Page,
    User = models.User;

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.route('/')
    .get(function(req, res) {
    	res.redirect("/")
    })
    .post(function(req, res){
    	var pageInfo = {
    		title: req.body.title,
    		content: req.body.content,
    		status: req.body.status,
    		author: req.body.author,
    		urlTitle: makeUrlTitle(req.body.title)
    	}
    	var page = new Page (pageInfo);
    	page.save();
    	res.redirect("/")
    })
router.route("/add")
	.get(function(req, res){
		res.render('addpage', {})
	});


function makeUrlTitle (titleString){
	return titleString.replace(/\s+/g,"_")
		.replace(/\W+/g,"")		
}

module.exports = router;