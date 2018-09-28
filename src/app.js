const pug = require('pug');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { URL } = require('url');

const Widget = require('./models/Widget');

const app = express();


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.enable('trust proxy');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, Session, X-CSRF-Token, User-IP");
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.use((req, res, next) => {
    const {method, originalUrl} = req;
    console.log(method + ' request for: ' + originalUrl + ' from ' + req.get('User-IP'));
    next();
});

app.use((req, res, next) => {
    const toParsedUrl = (url) => {
        url = new URL(decodeURIComponent(url));
        let path = url.pathname;
        if(path[path.length - 1] == '/') path = path.slice(0, -1);

        return url.origin + path;
    }

    const {body, query} = req;

    if(body.hasOwnProperty('url')) {
        req.body.url = toParsedUrl(body.url);
    }
    if(query.hasOwnProperty('url')) {
        req.query.url = toParsedUrl(query.url);
    }
    
    next();
});



app.use(require('./routes'));

app.get('/script', (req, res) => res.sendFile(__dirname + '/public/sparrow.js'));

app.get('/throw', (req, res) => {
    throw 'Uncaught exception on main thread.';
});


module.exports = app;
