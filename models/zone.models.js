const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the scheme of the item to be saved in database
const zoneSchema = new Schema({

    sensors:{
    type: Schema.Types.ObjectId,
    ref: "sensors",
    },

    nom: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
},{timestamps:true});

module.exports = zone = mongoose.model('zone', zoneSchema);