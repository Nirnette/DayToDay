/**
 * Created by root on 21/03/17.
 */


//imports
const express = require('express');
const http = require('http');
const util = require('util');
const url = require('url');
const fs = require('fs');
const database = require('./database');
const compression = require('compression');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const yaml = require('js-yaml');
const session = require('express-session');
const connectData = require('./secret.js').connectData;

//Serveur avec express
////////////////////////////////////////////////
const app = express();

try {
    let doc = yaml.safeLoad(fs.readFileSync('params.yml', 'utf8'));
} catch(e){
    console.log(e)
}


database.mongoose.connect(connectData);
//config
// On écoute le serveur
app.listen(3005);

//middleware
app.use(compression()); // on ajoute le middleware, celui ci permet de comprimer les pages envoyées
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico'))); // permet de rajouter une favicon
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//config express
app.set('view engine', 'jade'); // permet d'utiliser les template jade
app.set('views', './views'); // On définit le répertoire des views
app.use(express.static('public')); // On définit le répertoire de base du css etc....


app
    .get('/', function(req, res){
        res.setHeader('Content-Type', 'text/html');
        res.render('layout');
    })
;