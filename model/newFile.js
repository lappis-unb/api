const mongoose = require('mongoose');
const { propostaModeracaoSchema } = require('./propostamoderacao');

module.exports = mongoose.model('propostamoderacao', propostaModeracaoSchema);
