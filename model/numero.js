const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemaSchema = new Schema({
//    email: { type: String, required: true, unique: true, lowercase: true },
    id: { type: Number },
    categoria: { type: Number },
    proposta: { type: Number },
    tipo: { type: String },
    ranking: { type: Number },
    regiao: { type: String },
    tipo_detalhe: { type: String },
    pop_qtde: { type: Number },
    pop_perc: { type: Number },
    vot_qtde: { type: Number },
    vot_perc: { type: Number },
    medida: { type: Number },
    created: { type: Date, default: Date.now}
});

// TemaSchema.pre('save', function(next) {
//     let tema = this;
//     if (!tema.isModified('template')) return next();
//     console.log('tema antes de gravar: ',tema);
// });

module.exports = mongoose.model('numeros', TemaSchema);