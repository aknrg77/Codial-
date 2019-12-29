const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

// tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID:env.google_clientID,
    clientSecret:env.google_clientSecret,
    callbackURL:env.google_callbackURL
},
    function (accessToken,refreshToken,profile,done){
        
            
            User.findOne({email: profile.emails[0].value}).exec(function(err,user){
                if(err){console.log('error in google strategy passport',err); return;}
            
            //console.log(accessToken,refreshToken);
            //console.log(profile);

            // if user is found in the google database and codial set this request in req.user

            if(user){
                return done(null,user);
            }
            // if user is not found in the database the we have to sign up using google
            // create the user and set it to req.user
            else{
                User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')

                },function(err,user){
                    if(err){console.log('error in creating user google strategy-passport'); return ;}
                    return done(null,user);
                });        
                
            }

       
    });

}

));


module.exports = passport;