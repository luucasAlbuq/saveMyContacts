//Calling the model
const Contact = require('../models/Contact');

//Exporting the methods
module.exports = {
  findAllContact: findAllContact,
  findOneContact: findOneContact,
  createContact: createContact,
  updateContact: updateContact,
  deleteContact: deleteContact
}

/***************************************************************************
 * Conviniente methods
 * > Contact.find()
 * > Contact.findOne()
 * > Contact.save() : to save and update a Object.
 * > Contact.remove()
/***************************************************************************/

function findAllContact(request, response){
  Contact.find({},function(error,data){
    if(error || data === null){
      response.status(404);
      response.send('Contacts not found!');
    }
    response.json(data);
  });
}

function findOneContact(request, response){
  var contact_id = request.params.contact_id;
  Contact.findOne({_id:contact_id}, function(error, data){
    if(error || data === null){
      response.status(404).send(error);
      console.log(error);
    }
    response.json(data);
  });
}

function createContact(request, response){
  // validate information
  request.checkBody('name', 'Name is required.').notEmpty();

  //create a new contact
  var newContact = new Contact({
    name:request.body.name,
    email: request.body.email,
    fone: request.body.fone
  });

  newContact.save(function(error, data){
    if(error){
      response.status(500).send(error);
      console.log(error);
    }
    response.json(data);
  });
}

function updateContact(request, response){
  var contact_id = request.params.contact_id;
  var contactUpdated = request.body;

  Contact.findByIdAndUpdate(
    contact_id,
    {$set :contactUpdated},
    function(error,data){
      if(error){
        response.status(500).send(error);
        console.log(error);
      }

      if(data === null){
        response.status(404);
      }else{
        //TODO returns the data updateed from the database
        response.status(200);
      }

      response.send();
    }
  );
}

function deleteContact(request, response){
  var contact_id = request.params.contact_id;
  Contact.findByIdAndRemove(contact_id, function(error, data){
    if(error){
      response.status(500).send(error);
      console.log(error);
    }

    if(data === null){
      response.status(404);
    }else{
      response.status(200);
    }

    response.send();
  });
}
