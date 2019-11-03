const Post = require('../models/post');


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
    Post.find({}).populate('user').exec(function(err,post){
        return res.render("home",{
            title : "Home",
            posts : post
        });

    });



}
