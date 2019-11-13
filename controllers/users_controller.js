const User = require('../models/user');
const fs = require('fs');
const path = require('path');

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

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err){
    //         if(err){
    //             console.log('Unsuccesfull in updating');
    //         }
    //         return res.redirect('back');
    //     });
 
    // }
    // else{
    //    
    // }

    if(req.user.id == req.params.id){
        try{

            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******Multer Error',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    // if the avatar is present then delete the avatar or replace it with the previous
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..',user.avatar));
                        //TODO
                    }


                    user.avatar = User.avatarPath + '/' + req.file.filename;
                    // this is saving the path of the uploaded file into the avatar field in the user
                }
                user.save();
                return res.redirect('back');
            });
        }

        catch(err){
            console.log('Error',err);
            return res.redirect('back');
        }







    }else{
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
module.exports.create = async function(req,res){

  try{
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }

    let user = await User.findOne({email:req.body.email});
    if(!user){
        await User.create(req.body);
            return res.redirect('/users/signin');
    }
    else{
        res.redirect('back');
    }
  }catch(err){
      console.log('Error',err);
  }

}


//rendering createSession (Sign IN)
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Succesfully'); // flash messeage
    return res.redirect('/');

}


//controller of sign out

module.exports.signout = function(req,res){
    // or using inbuilt function of passport.js
    req.logout();
    req.flash('success','Logged Out Succesfully'); // flash messeage
    return res.redirect('/users/signin');
    // if(req.isAuthenticated()){
    //     res.clearCookie('codial');
    //     return res.redirect('/users/signin');
    // }
    // or using inbuilt function of passport.js
}