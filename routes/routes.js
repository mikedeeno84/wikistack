var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.route('/')
    .get(function(req, res) {
        res.render('index', {});
    })

module.exports = router;

