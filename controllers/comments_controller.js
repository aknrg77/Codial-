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

// deleting a specific a comment 
module.exports.destroy = function (req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(err){
            console.log('Error in finding Post');
        }
        //deleting his / her comment only
        if(comment.user = req.user.id){
            // fetching postid and further fetching comment in the commentsArray to delete the COMMENT fully
            let postIdToDeleteComment = comment.postid;
            comment.remove();
            Post.findByIdAndUpdate(postIdToDeleteComment, {  $pull : {comments:req.params.id}  },function(err,post){
                if(err){
                    console.log('Error in finding the comment');
                }
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }

    });

}