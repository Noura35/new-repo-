var express = require('express');
var router = express.Router();
const multer = require("multer");
const upload = multer();
const passport = require("passport");
const zone = require("../models/zone.models");

const zoneController = require('../controllers/zone.controllers');

router.get('/zone' , zoneController.readZone);


//zones 
router.post('/zone',(req,res)=>{
 
       const newItem = new zone({
       nom: req.body.nom,   
    });
    // save value to database
    newItem.save()
        .then(item => res.json(item));
    console.log(req.body);
   });




module.exports = router;
