const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nome: String,
    email: String,
    cpf: String,
    endereco: String,
    senha: String,
    data: Date,
    destacados: [],
}, {versionKey: false});

module.exports = mongoose.model("usuario", usuarioSchema);