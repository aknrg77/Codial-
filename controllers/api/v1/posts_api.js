const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


module.exports.index = async function (req,res){
        // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path:'user'
            }
        });

    return res.json(200,{
        message : "List Of posts",
        posts : posts
    });
}

module.exports.destroy = async function(req,res){
    try{
    let post = await Post.findById(req.params.id);
    //req.user._id (it is in integer)
    //req.user.id (it is in string format)
    if(post.user == req.user.id){

        post.remove();

        // deletes all comments
        await Comment.deleteMany({postid:req.params.id});

       

        return res.json(200,{
            message : "Post and associated comments deleted succesfully!"
        });
    }
     else{
        return res.json(401,{
            message : "You can't delete this post "
        });
     }
    }catch(err){
     console.log(err);
    return res.json(500,{
        message: "Internal server error"
    });
}



}