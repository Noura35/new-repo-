const mongoose = require('mongoose');

const valueSchema = new mongoose.Schema(

    {
    hum: String,
    temp: String,
    humsol: String,
    electrovane: Boolean,
    dateTime: String

  },
  {
    timestamps: true,
  }
);

const value = mongoose.model("value", valueSchema);
module.exports = value;