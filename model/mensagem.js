const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const bcrypt = require('bcrypt');

const MensagemSchema = new Schema({
//    email: { type: String, required: true, unique: true, lowercase: true },
    template: { type: String },
    assunto: {type: String},
    texto: {type: String, Select: false},
    tipo: {type: String},
    created: { type: Date, default: Date.now}
});

MensagemSchema.pre('save', function(next) {
    let mensagem = this;
    if (!mensagem.isModified('template')) return next();

    console.log('mensagem antes de gravar: ',mensagem);

    // bcrypt.hash(user.password, 10, (err,encrypted) => {
    //     user.password = encrypted;
    //     return next();
    // })
});



// module.exports = mongoose.model('users', UserSchema);
module.exports = mongoose.model('mensagems', MensagemSchema);