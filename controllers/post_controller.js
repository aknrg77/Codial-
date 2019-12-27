const Post = require('../models/post');
const Comment = require('../models/comment'); 
const Like = require('../models/like');

module.exports.create = async function(req,res){

    try{
            let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });

        //checking if it is a AJAX request 
        if(req.xhr){
            post = await post.populate('user', 'name').execPopulate();
            return res.status(200).json({
                data:{
                    post:post
                },
                message : "Post Created"
            });
        }

        req.flash('success','Post Created Sucessfully');

        return res.redirect('back');

    }catch(err){
    console.log('Error',err);
    return;
    }
}


//Deleting a Post 
module.exports.destroy = async function(req,res){
    try{



    let post = await Post.findById(req.params.id);
    //req.user._id (it is in integer)
    //req.user.id (it is in string format)
    if(post.user == req.user.id){


        //delete the associated likes for the post and all it's comment likes too
        //await deleteMany({likeable: post, onModel :'Post'});

        // doubt 
        //await deleteMany({_id:{$in :post.comments}});







        post.remove();

        // deletes all comments
        await Comment.deleteMany({postid:req.params.id});

        //Handling AJAX request 
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message : "Post Deleted"
            });

        }

        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
} catch(err){
    console.log('Error',err);
}



}