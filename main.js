var express = require('express');
var indexRouter = require('./routes/index');
var UserRouter = require('./routes/UsuariosAPI')
var AlimentoRouter = require('./routes/AlimentoAPI');
var path = require('path');
const session = require('express-session');

const app = express();


app.use(session({
    secret: '13579',
    resave: false,
    saveUninitialized: false
}));

// view engine setup
var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');


app.use(express.json());
app.use('/', indexRouter);
app.use('/usuario', UserRouter);
app.use('/alimento', AlimentoRouter);


app.use(express.static('public'));

app.listen(3000, () => {
    console.log("Listenning...")
})


module.exports = app;


