/********************************* IMPORTS ************************************/
/*Ecripty the database user and pass*/
require('dotenv').config();
/*The port comes from the .env file, the default value is 3000*/
const port = process.env.PORT || 3000

/*Let's use it to implement the rest services*/
const express = require('express');
const expressValidator = require('express-validator');
const app = express();

/*Object modeling for mongoDB*/
const mongoose = require('mongoose');

/*log info into console*/
const logger = require('morgan');

/*Parser data from the html file*/
const bodyParser = require('body-parser')

/*loading routes*/
const contactRoutes = require('./routes/contactRoutes.js');

/* simular DELETE e PUT (express4) */
var methodOverride = require('method-override');
/********************************* IMPORTS END ********************************/


/********************************* database Config ****************************/
/*Connecting to the remote mongo database*/
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database');
  startApp();
});
/******************************* END: database Config *************************/


/*path to public files*/
app.use(express.static(__dirname+'/public'));
/*setup the logger*/
app.use(logger('dev'));
/*setting Parser data*/
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
/*validate fields*/
app.use(expressValidator());
app.use('/contact',contactRoutes);

/* Startup the application on port 3000*/
function startApp(){
  app.listen(3000, function() {
    console.log('listening on 3000')
  });
}

/*setUp API for AngularJS*/
app.get('*',function(request, response){
  response.send('/public/index.html');
});
