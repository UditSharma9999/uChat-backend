const express = require('express');
const router = express.Router();

const Chat = require('../models/Chat');


router.post('/', async (req, res) => {
    // console.log('req.body', req.body);
    let find = await Chat.find({ "user.myEmail": `${req.body.email}`.trim() });
    // console.log('find', find);

    let EmailArray = []

    if (find.length != 0) {
        for (let i = 0; i < find.length; i++) {
            let Str = `${find[i].user._id}`
            // console.log(Str);
            EmailArray.push(Str.split("_")[1])
        }
    }

    const filteredArr = EmailArray.reduce((acc, current) => {
        const x = acc.find(item => item === current);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    var filtered = filteredArr.filter(function (x) {
        return x !== undefined;
    });

    // console.log(filtered);
    // console.log("Filt", filteredArr);
    // console.log(" EmailArray", EmailArray);
    res.send({ 'EmailArray':filtered });
    res.end();
})


module.exports = router;