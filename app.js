var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    swig = require('swig'),
    morgan = require('morgan');
var wikiRouter = require('./routes/wiki.js');
var userRouter = require('./routes/users.js')

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache:false});
// app.use(bodyParser.urlEncoded({extended:true}));
// app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static(__dirname + '/stylesheets'));
app.get("/", function(req, res){
	res.render('index', {});
})
app.use("/wiki/", wikiRouter);
app.use("/users/", userRouter);
app.listen(3000, function() {
    console.log("server listening on port 3000..");
});