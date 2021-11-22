const { Schema, model } = require('mongoose');

const schema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    childs: { type: Boolean, required: true },
    parent: { type: Number, required: true },
    edit: { type: Boolean, required: true },
})

module.exports = model('Elem', schema);