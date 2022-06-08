const mongoose = require('mongoose');

const valueSchema = new mongoose.Schema(

    {
    deviceID: String,
    valueT: String,
    valueH: String,
    dateTime: String

  },
  {
    timestamps: true,
  }
);

const value = mongoose.model("value", valueSchema);
module.exports = value;