const Post = require('../models/post');
const Comment = require('../models/comment'); 

module.exports.create = async function(req,res){
    try{
            await Post.create({
            content:req.body.content,
            user:req.user._id
        });
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

        post.remove();

        // deletes all comments
        await Comment.deleteMany({postid:req.params.id});
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
} catch(err){
    console.log('Error',error);
}



}