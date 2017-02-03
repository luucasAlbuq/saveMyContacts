var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const contactDB = mongoose.model('contacts');

/*Search API*/
module.exports = function(app){
  app.get('/api/contacts',function(request, response){
    console.log(">>> search", contactDB)
        contactDB.find(function(error, data){
          if(error){
            response.status(500).send(error);
            console.log(error);
          }
          response.json(data);
        });
  });
}

/*search by id API*/
module.exports = function(app){
  app.get('/api/contact/:contact_id', function(request, response){
    var contact_id = request.params.contact_id;

    contactDB.findOne({_id:contact_id}, function(error, data){
      if(error){
        response.status(404).send(error);
        console.log(error);
      }
      response.json(data);
    });
  });
}

/*Create API*/
module.exports = function(app){
  app.post('/api/addContact', function(request, response){
    contactDB.Create(
      {
        name:request.body.name,
        email: request.body.email,
        fone: request.body.fone
      },
      function(error, contact){
        if(error){
          response.status(500).send(error);
          console.log(error);
        }
        response.json(contact);
      }
    );
  });
}

/*put API*/
module.exports = function(app){
  app.put('/api/updateContact/:contact_id', function(request, response) {
    var contactUpdated  = request.body;
    var contact_id = request.params.contact_id;
    contactDB.update(
        {_id:contact_id},
        contactUpdated,
        {upsert:true},
        function(error, data){
          if(error){
            response.status(500).send(error);
            console.log(error);
          }
          response.json(data)
        });
  });
}
