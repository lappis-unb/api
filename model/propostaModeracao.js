const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propostaModeracaoSchema = new Schema({
//    email: { type: String, required: true, unique: true, lowercase: true },
    id: Number,
    id_proposta: String,
    tags: [],
    id_moderacao: String,
    resultado: [],
    created_at: String,
    body: String,
    id_moderador: String,
    nome_moderador: String, 
    estado: String,            
});

module.exports = mongoose.model('propostamoderacoes', propostaModeracaoSchema);