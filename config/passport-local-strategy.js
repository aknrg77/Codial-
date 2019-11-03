const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');



// authentication using passport 
passport.use(new LocalStrategy({
    usernameField:'email'
},
function (email,password,done){
    User.findOne({email:email},function (err,user){
        if(err)
        {
            console.log('Error in finding User -->Passport');
            return done(err);
        }
        if(!user || user.password!= password){
            console.log('Envaid Username or password');
            return(null,false);
        }
        return done(null,user);

    });

}
));


//serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});





//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log('Error in finding User -->Passport');
            return done(err);
        }
        return done(null,user);
    });

});

//check the user is authenticated (middleware)
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in 
    return res.redirect('/users/signin');
}


//views the authenticated user  (middleware)
passport.setAuthenticatedUser = function (req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we just sending this to the locals for the views
        res.locals.user = req.user;
    }
    return next();
}


module.exports = passport;