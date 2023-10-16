const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemaSchema = new Schema({
//    email: { type: String, required: true, unique: true, lowercase: true },
    id: { type: Number },
    nome: {type: String},
    created: { type: Date, default: Date.now}
});

TemaSchema.pre('save', function(next) {
    let tema = this;
    if (!tema.isModified('template')) return next();
    console.log('tema antes de gravar: ',tema);
});

module.exports = mongoose.model('ministerios', TemaSchema);