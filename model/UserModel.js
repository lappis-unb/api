var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    'firstname': String,
    'lastname': String,
    'address': String,
    'city': String,
    'state': String,
    'phone': String,
    'mobilephone': String,
    'email': String,
    'password': String,
    'passwordResetToken': String,
    'passwordResetExpires': Date,    
})

module.exports = mongoose.model('User', UserSchema);