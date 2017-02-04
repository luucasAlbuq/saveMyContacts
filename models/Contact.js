var mongoose = require('mongoose');

/*creating a new schema for Contact*/
const contactSchema = new mongoose.Schema({
  name:String,
  email:{type:String,unique:true},
  fone:{type:Number, default: 0}
});

//Run allways before the save operation
contactSchema.pre('save',function(next){
  //Make the validation
  valdateContact();
  next();
});

//Create the model
const contactModel = mongoose.model('contact',contactSchema);

//export the model
module.exports = contactModel;

function valdateContact(contact){
  //TODO
}
