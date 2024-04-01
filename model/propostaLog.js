const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propostasLogSchema = new Schema({
    data_log: Date,
    id_proposta: String,
    id_usuario: String,
    nome_usuario: String,
    texto: String,
    proposta_anterior: {
        _id: String,
        id: Number,
        category_id: Number,
        category_name: String,
        participatory_space_id: Number,
        participatory_space_url: String,
        component_id: Number,
        title: String,
        body: String,
        state: String,
        reference: String,
        answer: String,
        supports: Number,
        endorsements_total_count: Number,
        comments: Number,
        attachments: Number,
        followers: Number,
        published_at: String,
        url: String,
        is_amend: Boolean,
        tags: [],
        estado: String,
        bairro: String,
        cep: String, 
        complemento: String,
        ddd: String,
        gia: String,
        ibge: String,
        localidade: String,
        logradouro: String,
        siafi: String,
        uf: String
        }
    });    
// }, { collection: "propostas1" });

module.exports = mongoose.model('propostaslog', propostasLogSchema);
