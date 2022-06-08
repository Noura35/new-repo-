const mongoose = require('mongoose');

const valueSchema = new mongoose.Schema(

    {
    deviceID: String,
    hum: String,
    temp: String,
    electro: 0,
    dateTime: String

  },
  {
    timestamps: true,
  }
);

const value = mongoose.model("value", valueSchema);
module.exports = value;