var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    swig = require('swig'),
    morgan = require('morgan');
var router = require('./routes/routes.js');


app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache:false});
// app.use(bodyParser.urlEncoded({extended:true}));
// app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static(__dirname + '/stylesheets'));

app.use(router);

app.listen(3000, function() {
    console.log("server listening on port 3000..");
});