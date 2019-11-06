const Post = require('../models/post');
const Comment = require('../models/comment'); 

module.exports.create = function(req,res){
    // if(!req.isAuthenticated()){
    //     return res.redirect('/users/signin');
    // }  or call checkAuthentication at Routes
Post.create({
    content:req.body.content,
    user:req.user._id
},function(err,post){
    if(err){console.log('error in creating post');return;}
    return res.redirect('/');
});


}


//Deleting a Post 
module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log("error in finding the post");
        }
        //req.user._id (it is in integer)
        //req.user.id (it is in string format)
        if(post.user == req.user.id){

            post.remove();

            // deletes all comments
            Comment.deleteMany({postid:req.params.id},function(err){
                if(err){
                    console.log("error in deleting the comments");
                }
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }

    });



}