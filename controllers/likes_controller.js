const like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');



module.exports.toggleLike = async function(req,res){

    try{
        //  likes/toggle/?id=abcdefg&type=Post
        let likeable ;
        let deleted = false ;
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id);
        }
        else{
            likeable = await Comment.findById(req.query.id);

        }

        //check if the like already exist or not 
        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user : req.user._id

        });

        // if a like already exist then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true ;

        } //else make a new like 
        else {
            let newLike = await Like.create ({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type 
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }


        return res.json(200,{
            message : "Request Succesful",
            data : {
                deleted : deleted
            }
        })


    }

    catch(err){
       console.log(err);
       return res.json(500,{
           message : "Internal Servor Error"
       });
    }





}



