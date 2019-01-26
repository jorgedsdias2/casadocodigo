require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

require('./passport')(passport);

app.use('/estatico', express.static('src/app/public'));
app.use(session({
    secret: 'cats',
    saveUninitialized: false,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}));

app.use(flash());

const rotas = require('../app/rotas/rotas');
const auth = require('../app/rotas/auth');

rotas(app);
auth(app, passport);

module.exports = app;