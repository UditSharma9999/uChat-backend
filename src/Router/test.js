const express = require('express');
const router = express.Router();

router.post('/',(req,res)=>{
    res.send({"msg":"sucess"})
    res.end()
})

module.exports = router ;