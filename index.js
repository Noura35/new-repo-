const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
//const router=require("./routes/route")

const Item = require('./models/item');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





mongoose.connect("mongodb+srv://agrosmart:agrosmart@cluster0.q1dly.mongodb.net/auth?retryWrites=true&w=majority",
).then(() => {
    console.log('connected to base de données')
})



//-----------------------------------------------------------------//

// handle get reuests
// sends the last 7 values
// react app sensds this get request
app.get('/api/sensors', function(req, res) {
    Item.find()
        .then(items => res.json(items.slice(items.length - 6, items.length)))
        .catch(err => console.log(err));
});

// handle post requests
app.post('/api/sensors', function(req, res) {
    // create new item using the schema
    const newItem = new Item({
        temp: req.body.temp,
        hum: req.body.hum,
        humsol: req.body.humsol,
        electrovane:req.body.electrovane
    });
    // save value to database
    newItem.save()
        .then(item => res.json(item));
    console.log(req.body);
});






// start the server @localhost:5000
const port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});








