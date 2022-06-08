const mongoose = require('mongoose');

const valueSchema = new mongoose.Schema(

    {
    deviceID: Number,
    valueT: Number,
    valueH: Number,
    dateTime: Date

  },
  {
    timestamps: true,
  }
);

const value = mongoose.model("value", valueSchema);
module.exports = value;