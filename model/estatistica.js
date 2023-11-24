const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estatisticaSchema = new Schema({
    id: Number,
    category_id: Number,
    category_name: String,
    participatory_space_id: Number,
    participatory_space_url: String,
    data_num: [],
    propostas: Number,
    supports: Number,
    followers: Number,
    });    
// }, { collection: "propostas1" });

module.exports = mongoose.model('estatistica', estatisticaSchema);
