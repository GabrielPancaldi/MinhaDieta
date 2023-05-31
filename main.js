var express = require('express');
var indexRouter = require('./routes/index');
var path = require('path');
var router = express.Router();

const app = express();



// view engine setup
var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');


app.use(express.json());
app.use('/', indexRouter);


app.use(express.static('public'));

app.listen(3000, () => {
    console.log("Listenning...")
})


module.exports = app;


