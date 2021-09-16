const express = require('express');
const router = express.Router();

const SignUp = require('../models/SignUp');

router.post('/', async (req, res) => {
    const find = await SignUp.find({ token: req.body.token });
    return res.json({ message: find });
});

module.exports = router;