const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../config/mailers/comments_mailer'); 
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');



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

        //pre populating user 
        comment = await comment.populate('user','name email').execPopulate();
            
            

            // sending mail 

           // commentsMailer.newComment(comment); sending mail without delaying 



            // creating a comment and pushing into worker kue (../workers/comment_email_worker.js)
            let job = queue.create('emails' , comment).save(function(err){
                if(err){
                    console.log('error in creating a queue ',err);
                    return ;
                }
                console.log('job enqueued ',job.id);
            });

            //checking if it is a AJAX request 
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message: "comment created"
                });


            }


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
        if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Post deleted"
            });
        }
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
