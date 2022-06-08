const express = require('express')

const router = express();


router.post("/test", (req, res) => {
    res.send('hello world');
})

router.get("/test", (req, res) => {
    res.send('bonjour');
})




module.exports = router;
