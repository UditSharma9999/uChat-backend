const express = require('express');
const router = express.Router();

const SignUp = require('../models/SignUp');

router.post('/', async (req, res) => {
    console.log("req:", req.body);
    if (req.body.email != '' && req.body.password != '') {

        const find = await SignUp.find({ email: req.body.email });
        if (find[0] != undefined) {

            try {
                console.log(find[0]);
                console.log(find[0].email);
                let email = `${find[0].email}`.trim();
                let password = `${find[0].password}`.trim();
                if (password === req.body.password && email === req.body.email) {
                    return res.json({ message: find, validation: "true" });
                }
            } catch (error) {
                console.log(error);
                return res.json({ message: error });
            }
        } else {
            return res.json({ message: "error" });
        }
        res.end();
    }
})

module.exports = router;