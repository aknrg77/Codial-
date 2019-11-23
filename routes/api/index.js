const express = require('express');  
const router = express.Router();  // using the Router function 

router.use('/v1',require('./v1'));








module.exports = router;