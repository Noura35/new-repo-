const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.post("/test", (req, res) => {
    res.send('hello world');
})

app.get("/test", (req, res) => {
    res.send('bonjour');
})



mongoose.connect('"mongodb+srv://agrosmart:agrosmart@cluster0.q1dly.mongodb.net/auth?retryWrites=true&w=majority',
).then(() => {
    console.log('connected to base de données')
})

const PORT = process.env.PORT || 5000; 

app.listen(PORT,()=>{
    console.log('server is running...')
})