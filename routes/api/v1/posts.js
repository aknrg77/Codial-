const express = require('express');  
const router = express.Router();  // using the Router function 
const postsApi = require('../../../controllers/api/v1/posts_api');
// importing passport
const passport = require('passport');


router.get('/',postsApi.index);

// authenticating JWT
router.delete('/:id',passport.authenticate('jwt',{session : false}),postsApi.destroy);
// session is false to not generate session cookies 






module.exports = router;