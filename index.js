const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
//const router=require("./routes/route")

const value = require("./models/value");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/test", (req, res) => {
    res.send('hello world');
})

app.get("/test", (req, res) => {
    res.send('bonjour');
})

app.get('/log',(req,res)=>{
    console.log(req.body);
   let newvalue = new value ({
      deviceID :req.body.id,
      temp :req.body.temp,
      hum :req.body.hum,
      dateTime:Math.floor(Date.now() / 1000)
       
       
    });
    newvalue.save()
     return res.status(200).json({
         success:"Position save effactué avec succes"
     });
   });

   app.post('/post',(req,res)=>{
 
       const newItem = new Item({
       temp: req.body.temp,
       hum: req.body.hum,
       humsol: req.body.humsol,
      electrovane: req.body.electrovane
    });
    // save value to database
    newItem.save()
        .then(item => res.json(item));
    console.log(req.body);
       
       
       
       
       
       
   });

mongoose.connect("mongodb+srv://agrosmart:agrosmart@cluster0.q1dly.mongodb.net/auth?retryWrites=true&w=majority",
).then(() => {
    console.log('connected to base de données')
})

const PORT = process.env.PORT || 5000; 

app.listen(PORT,()=>{
    console.log('server is running...')
})