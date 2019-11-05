const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.postid,function(err,post){
        if (post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                postid:post._id
            },function(err,comment){
                if(err){
                    console.log('error in adding comment');
                }
                //adding comment to the postSchema
                post.comments.push(comment);
                post.save();

               return res.redirect('/');
            });

        }
        else{
            console.log('error in finding post');
        }
    });

}