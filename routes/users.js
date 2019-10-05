//// USERS router ex--> users/profile , users/contact

const express = require('express');
const router = express.Router();



const usersController = require('../controllers/users_controller');
// acessing the /users/profile part of the router 


router.get('/profile',usersController.profile);


router.get('/contact',usersController.contact);
module.exports = router ;
