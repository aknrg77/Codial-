//// USERS router ex--> users/profile , users/contact

const express = require('express');
const router = express.Router();
const passport = require('passport');



const usersController = require('../controllers/users_controller');
// acessing the /users/profile part of the router 


router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
//update
router.post('/update/:id',passport.checkAuthentication,usersController.update);




router.get('/contact',usersController.contact);


// to render signup page

router.get('/signup', usersController.signup);

// to render signup page

router.get('/signin', usersController.signin);

// to create (signup)

router.post('/create',usersController.create);



// to create-session (signin) use passport as a middleware to authnticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/signin'}
),usersController.createSession);


//creating a sign out route
router.get('/signout',usersController.signout);

module.exports = router ;
