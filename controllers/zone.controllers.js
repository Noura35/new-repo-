const Zone = require("../models/zone.models");


module.exports.readZone = (id, callback) => {
    Zone.find({ sensors: id }, callback) 
    .populate('sensors')
};

