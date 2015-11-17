var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.route("/")
	.get(function(req, res){

	})
	.post(function(req, res){

	})

router.route("/:userNum")
	.get(function(req, res){

	})
	.put(function(req, res){

	})
	.delete(function(req, res){
		
	})



module.exports = router;