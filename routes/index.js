const express = require('express');  
const router = express.Router();  // using the Router function 
const homeController = require('../controllers/home_controller.js')  // requiring the homecontroller

console.log('Router loaded');  // checking wheather router is loaded or not 

router.get('/',homeController.home);  

// asking a middleware to further load /users/profile

router.use('/users',require('./users'));


//for any further routes ,acess from here

// router.use('/routername', require ('./routerfile'));

router.use('/posts',require('./posts'));


router.use('/comments',require('./comments'));


router.use('/likes',require('./likes'));






router.use('/api',require('./api'));


module.exports = router ;