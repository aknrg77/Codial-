const express = require('express');  
const router = express.Router();  // using the Router function 
const usersApi = require('../../../controllers/api/v1/users_api');


router.post('/create-session',usersApi.createSession);




module.exports = router;