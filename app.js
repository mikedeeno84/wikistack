var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    swig = require('swig'),
    morgan = require('morgan');
require('./filters')(swig);
var wikiRouter = require('./routes/wiki.js');
var userRouter = require('./routes/users.js');
var Page = require('./models/index').Page;
var User = require('./models/index').User;

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache:false});
// app.use(bodyParser.urlEncoded({extended:true}));
// app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static(__dirname + '/stylesheets'));
app.get("/", function(req, res){
    Page.find({})
        .then(function(pages) {
            res.render('index', {pages:pages});
        })
        .then(null, function(err) {
            console.error(err);
        });
});
app.use("/wiki/", wikiRouter);
app.use("/users/", userRouter);
app.listen(3000, function() {
    console.log("server listening on port 3000..");
});