const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Chat = require('../models/Chat');

router.post('/', async (req, res) => {
    console.log(req.body);
    if (req.body[0] != undefined) {
        // console.log(req.body);
        if (req.body[0].text != undefined && req.body[0].text != "") {

            // const Modle = mongoose.model(`${req.body.user._id}`);

            // const modle = Modle({
            //     _id: req.body._id,
            //     text: req.body.text,
            //     createdAt: req.body.createdAt,
            //     user: req.body.user
            // })
            // modle.save();

            console.log("saved")
            const chat = new Chat({
                _id: req.body[0]._id,
                text: req.body[0].text,
                createdAt: req.body[0].createdAt,
                user: req.body[0].user
            })
            chat.save();
        }
    }
    if (req.body.uid != undefined) {
        
        // const Modle = mongoose.model(`${req.body._id}`, {
        //     _id: String,
        //     text: String,
        //     createdAt: Date,
        //     user: {
        //         _id: String,
        //         Email: String,
        //     },
        // });

        let find = await Chat.find({ "user.uid": req.body.uid }).sort("createdAt");

        console.log('find',find);
        // console.log('find2',find2);

        if (find != undefined ) {
            let RenderArr = []

            if (find.length != 0) {
                let z = [];
                z.push(find);
                for (let i = 0; i < find.length; i++) {
                    z.map(item => {
                        RenderArr.push(item[i]);
                    })
                }
            }

            res.send({ 'RenderArr': RenderArr.reverse() })
        }
    }
    res.end();
});


module.exports = router;