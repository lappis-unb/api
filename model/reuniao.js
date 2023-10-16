const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reunioesSchema = new Schema({
id: Number,
category_id: Number,
category_name: String,
scope_id: Number,
scope_name: String,
participatory_space_id: Number,
participatory_space_url: String,
component_id: Number,
title: String,
description: String,
start_time: String,
end_time: String,
attendees: Number,
contributions: Number,
address: String,
location: String,
reference: String,
comments: Number,
attachments: Number,
followers: Number,
url: String,
published: String
});


module.exports = mongoose.model('reunioes', reunioesSchema);
