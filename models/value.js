const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the scheme of the item to be saved in database
const itemSchema = new Schema({
    temp: {
        type: String,
        required: true
    },
    hum: {
        type: String,
        required: true
    },
    humsol: {
        type: String,
        required: true
    },
    electrovane: {
        type: Boolean,
        default:true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', itemSchema);