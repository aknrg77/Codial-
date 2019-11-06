const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    try{
    let post = await Post.findById(req.body.postid);
    if (post){
    let comment = await Comment.create({
            content:req.body.content,
            user:req.user._id,
            postid:post._id
    }
    );
            //adding comment to the postSchema
            post.comments.push(comment);
            post.save();
    
           return res.redirect('/');
    
    }
    else{
        console.log('error in finding post');
    }
} catch (err){
    console.log('Error',err)
}

}

// deleting a specific a comment 
module.exports.destroy = async function (req,res){
    try{
    let comment = await Comment.findById(req.params.id);
    if(comment.user = req.user.id){
        // fetching postid and further fetching comment in the commentsArray to delete the COMMENT fully
        let postIdToDeleteComment = comment.postid;
        comment.remove();
        await Post.findByIdAndUpdate(postIdToDeleteComment, {  $pull : {comments:req.params.id}  });
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}
catch(err){
    console.log('Error',err);
}

    

}

//deleting his / her comment only
