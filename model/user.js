const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
//    email: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, lowercase: true },
    nome: {type: String},
    password: {type: String, required: true, select: false},
    cpf: {type: String},
    created: { type: Date, default: Date.now}
});

UserSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err,encrypted) => {
        user.password = encrypted;
        return next();
    })
});

// module.exports = mongoose.model('users', UserSchema);
module.exports = mongoose.model('cidadaos', UserSchema);