////////////////////////////////// IMPORTS /////////////////////////////////////

/*Let's use it to implement the rest services*/
var express = require('express');
var app = express();

/*Object modeling for mongoDB*/
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

/*log info into console*/
var logger = require('morgan');

/*Parser data from the html file*/
var bodyParser = require('body-parser')

// simular DELETE e PUT (express4)
var methodOverride = require('method-override');
////////////////////////////////// IMPORTS END /////////////////////////////////

/*loading our model*/
require('./models/Contact');
/*setup the routes*/
var restAPI = require('./routes/restAPI.js');
app.use('/',function(request,response){
  restAPI(request,response);
});


/*Connecting to the remote mongo database*/
var mongo_uri = 'mongodb://dev:dev@ds141209.mlab.com:41209/save_my_contacts';
mongoose.connect(mongo_uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database');
  startApp();
});


/*path to public files*/
app.use(express.static(__dirname+'/public'));
/*setup the logger*/
app.use(logger('dev'));
/*setting Parser data*/
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

/* Startup the application on port 3000*/
function startApp(){
  app.listen(3000, function() {
    console.log('listening on 3000')
  });
}

/*setUp API for AngularJS*/
app.get('*',function(request, response){
  response.sendFile('./public/index.html');
});
