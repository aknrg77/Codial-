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



// to create-session (signin) use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/signin'}
),usersController.createSession);


//creating a sign out route
router.get('/signout',usersController.signout);



//routing to google oauth to check valid user 
router.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));

// this is the URL in which it will recieve the data 

router.get('/auth/google/callback', passport.authenticate('google',

    {failureRedirect : '/users/signin'})
    , usersController.createSession

);





module.exports = router ;
