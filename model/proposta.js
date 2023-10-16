const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propostas1Schema = new Schema({
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
    tags: []
    });    
// }, { collection: "propostas1" });

module.exports = mongoose.model('propostas', propostas1Schema);
