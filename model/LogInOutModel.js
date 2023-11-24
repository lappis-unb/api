var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LogInOutSchema = new Schema({
    'id_user': String,
    'email': String,
    'tipo': String,  //1=LogIn, 2=LogOut'
    'data': Date,
})

module.exports = mongoose.model('LogInOut', LogInOutSchema);