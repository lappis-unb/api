const mongoose = require('mongoose');  
const Schema = mongoose.Schema; 

const moderacoesSchema = new Schema({ 
    id: Number, 
    created_at: { type: Date, default: Date.now},
    body: String, 
    evento: [String], 
    propostas_total: Number, 
    propostas_verificadas: Number, 
    propostas_pendentes: String, 
    estado: String, // [Ativo, 1=Inativo] 
    }); 
// }, { collection: "propostas1" }); 

module.exports = mongoose.model('moderacoes', moderacoesSchema); 
