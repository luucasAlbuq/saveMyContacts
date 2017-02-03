var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var contactDB = mongoose.model('contacts');
module.exports = router;

/*Search API*/
router.get('/api/contacts',function(request, response){
    contactDB.find(function(error, data){
      if(error){
        response.status(500).send(error);
        console.log(error);
      }
      response.json(data);
    });
});

/*search by id API*/
router.get('/api/contact/:contact_id', function(request, response){
  var contact_id = request.params.contact_id;

  contactDB.findOne({_id:contact_id}, function(error, data){
    if(error){
      response.status(404).send(error);
      console.log(error);
    }
    response.json(data);
  });
});

//FIXME NOT WORKING!
/*delete API*/
router.delete('/api/deleteContact/:contact_id', function(request, response){
  var contact_id = request.params.contact_id;
  contactDB.remove({_id:contact_id},function(error,data){
    if(error){
      response.status(500).send(error);
      console.log(error);
    }
    response.json(data);
  });
});

/*Create API*/
router.post('/api/addContact', function(request, response){
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

/*put API*/
router.put('/api/updateContact/:contact_id', function(request, response) {
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

/*setUp API for AngularJS*/
router.get('*',function(request, response){
  response.sendFile('./public/index.html');
});
