var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    'apinome': String,
    'resposta': [{}],
    'datarequisicao': String
})

module.exports = mongoose.model('matomo', UserSchema);