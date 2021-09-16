const express = require('express');
const router = express.Router();

const SignUp = require('../models/SignUp');

router.post('/', async (req, res) => {
    if(req.body.email!= undefined){
        const find = await SignUp.find({"email":`${req.body.email}`.trim()});
        res.send({ message: find });
    }else{
        const find = await SignUp.find();
        res.send({ message: find });
    }
    res.end();
})

module.exports = router;