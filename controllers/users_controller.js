const User = require('../models/user');



module.exports.profile = function (req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log('Error in finding the user');
        }
        return res.render("user_profile",{
            title:"user profile",
            profile_user:user
        });
    });
  
}




//Updating the profile page by using User.findByIdAndUpdate

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err){
            if(err){
                console.log('Unsuccesfull in updating');
            }
            return res.redirect('back');
        });
 
    }
    else{
        return res.status(401).send('Unauthorized');
    }


}


module.exports.contact = function (req,res){
    return res.render("user_contact",{
        title:"user contact"
    });
}




module.exports.signup = function (req,res){

    // if request (user) is authenticated then redirect to the profile page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render("user_signup",{
        title : "SIGN UP PAGE"
    });
}

module.exports.signin = function (req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render("user_signin",{
        title : "SIGN IN PAGE"
    });
}
//rendering create (Sign Up)
module.exports.create = function(req,res){

  
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error finding in user in signing up');return ;}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error creating user while signing up');
                    return ;
                }

                return res.redirect('/users/signin');

            })
        }
        else{
            res.redirect('back');
        }
    });

}

//rendering createSession (Sign IN)
module.exports.createSession = function(req,res){
    return res.redirect('/');

}


//controller of sign out

module.exports.signout = function(req,res){
    if(req.isAuthenticated()){
        res.clearCookie('codial');
        return res.redirect('/users/signin');
    }
    else{
        return res.redirect('/users/signin');
    }
    // or using inbuilt function of passport.js
    //req.logout();
}