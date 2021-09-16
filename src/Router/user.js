const express = require('express');
const router = express.Router();

const SignUp = require('../models/SignUp');

router.post('/', async (req, res) => {
    // console.log('/users/', req.body);
    let arr = []
    if (req.body.email != '') {
        for (let i = 0; i < req.body.email.length; i++) {
            // console.log("req.body.email",req.body.email[i])

            let find = await SignUp.find({ email: req.body.email[i] });

            if (find[0] != undefined) {
                // console.log("In /user", find[0]);
                arr.push(find[0])
            }
        }
        // console.log('arr',arr);
        return res.json({ message: arr });
    }
    res.end();
})


module.exports = router;