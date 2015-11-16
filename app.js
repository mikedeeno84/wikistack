var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    swig = require('swig'),
    morgan = require('morgan');

app.use(bodyParser.urlEncoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static(__dirname + 'public'));