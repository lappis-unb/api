const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propostasVotoSchema = new Schema({
    data_log: Date,
    id_proposta: String,
    id_usuario: String,
    nome_usuario: String,
    tipo: Number,
    texto: String,
    });    
// }, { collection: "propostas1" });

module.exports = mongoose.model('propostasvoto', propostasVotoSchema);
