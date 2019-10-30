const User = require('../models/user');



module.exports.profile = function (req,res){

    return res.render("user_profile",{
        title:"user profile"
    });
}

module.exports.contact = function (req,res){
    return res.render("user_contact",{
        title:"user contact"
    });
}




module.exports.signup = function (req,res){

    return res.render("user_signup",{
        title : "SIGN UP PAGE"
    });
}

module.exports.signin = function (req,res){

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

}