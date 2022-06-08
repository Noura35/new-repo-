const express = require('express');
const mongoose = require('mongoose');
const app = express();
//const router=require("./routes/route")

const value = require("./models/value");


app.post("/test", (req, res) => {
    res.send('hello world');
})

app.get("/test", (req, res) => {
    res.send('bonjour');
})

app.get('/log/:info',(req,res)=>{
   
   let tab=req.params.info

      
   var data = tab.split('||');
   var valDate = data[3];
 

   let newvalue = new value ({
      deviceID :data[0],
      valueT :data[1],
      valueH :data[2],
      dateTime:Math.floor(Date.now() / 1000)
       
       
    });
    newvalue.save()
       console.log(data);
     return res.status(200).json({
         success:"Position save effactué avec succes"
     });
   });


mongoose.connect("mongodb+srv://agrosmart:agrosmart@cluster0.q1dly.mongodb.net/auth?retryWrites=true&w=majority",
).then(() => {
    console.log('connected to base de données')
})

const PORT = process.env.PORT || 5000; 

app.listen(PORT,()=>{
    console.log('server is running...')
})