const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propostasComentarioSchema = new Schema({
    id: Number,
    created_at: String,
    body: String,
    locale: String,
    author_id: Number,
    author_name: String,
    alignment: Number,
    depth: Number,
    commentable_id: Number,
    commentable_type: String,
    root_commentable_url: String
    });    
// }, { collection: "propostas1" });

module.exports = mongoose.model('propostacomentarios', propostasComentarioSchema);
