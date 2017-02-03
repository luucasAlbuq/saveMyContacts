var mongoose = require('mongoose');

/*creating a new schema for Contact*/
var contactSchema = new mongoose.Schema({
  name:String,
  email:String,
  fone:{type:Number, default: 0}
});

mongoose.model('contacts',contactSchema);
