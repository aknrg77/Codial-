const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function (req,res){

    //console.log(req.cookies);
    //res.cookie('user_id',34);


    //finding all the post

    // Post.find({},function(err,post){
    //     return res.render("home",{
    //         title : "Home",
    //         posts : post
    //     });
        

    // });

    //populate the user for each post
    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate:{
            path : 'user'
        }
    })
    .exec(function(err,post){
        // finding the list of all the users in the database
        User.find({},function(err,users){

            return res.render("home",{
                title : "Home",
                posts : post,
                all_users : users
            });

        });


       

    });



}
