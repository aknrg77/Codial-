const Post = require('../models/post');

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