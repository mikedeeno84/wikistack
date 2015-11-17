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
    	var userInfo = {
    		name: req.body.author,
    		email: req.body.email
    	}
    	var pageInfo = {
    		title: req.body.title,
    		content: req.body.content,
    		status: req.body.status,
    	}
    	var user = User.find({name: req.body.author}).exec()
    	if(!user.length){
    		user = new User(userInfo)
    				.save()
    				.then(function(user){
    					pageInfo.author = user._id;
    				})
    				.then(null, function(err){
    					console.error(err)
    				})
    	}

    	
    	else{
    	var page = new Page (pageInfo)
    	page.save().then(function(){
    		res.redirect("/")})
    		.then(null, function(err){
    			console.log(err)
    		});
    	}
    	
    })
router.route("/add")
	.get(function(req, res){
		res.render('addpage', {})
	});

module.exports = router;