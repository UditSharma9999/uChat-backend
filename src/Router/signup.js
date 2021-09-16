const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SignUp = require('../models/SignUp');

router.post('/', async (req, res) => {
    const find = await SignUp.find({ email: req.body.email });
    if (find[0] == undefined) {

        let signUp = new SignUp({
            name: `${req.body.name}`.trim(),
            lname: `${req.body.lname}`.trim(),
            email: `${req.body.email}`.trim(),
            password: `${req.body.password}`.trim()
        });

        const id = signUp._id;
        const token = jwt.sign({ _id: id }, "mySecretKeyforTheUserAuthentication");
        signUp.token = token;
        signUp.save();
        return res.json({ "message": token }).end();
    } else {
        return res.json({ message: 'Account already exist!' }).end();
    }
});

module.exports = router;