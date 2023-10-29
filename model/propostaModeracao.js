const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propostaModeracaoSchema = new Schema({
//    email: { type: String, required: true, unique: true, lowercase: true },
    id: Number,
    created_at: String,
    body: String,
    propostas_total: Number,
    propostas_verificadas: Number,
    propostas_pendentes: String,
});

module.exports = mongoose.model('propostamoderacao', propostaModeracaoSchema);