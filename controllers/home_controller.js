const Post = require('../models/post');
const User = require('../models/user');

//module.exports.home = function (req,res){

    //console.log(req.cookies);
    //res.cookie('user_id',34);

//USING CALLBACK FUNCTION !!!!!
    //finding all the post
    // Post.find({},function(err,post){
    //     return res.render("home",{
    //         title : "Home",
    //         posts : post
    //     });
        

    // });

    //populate the user for each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path : 'comments',
//         populate:{
//             path : 'user'
//         }
//     })
//     .exec(function(err,post){
//         // finding the list of all the users in the database
//         User.find({},function(err,users){

//             return res.render("home",{
//                 title : "Home",
//                 posts : post,
//                 all_users : users
//             });

//         });


       

//     });



// }



//USING ASYNC AWAIT !!!!!!!!!!
module.exports.home = async function (req,res){
    try{
            // populate the user of each post
            let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate:{
                    path:'user'
                }
            });

            let users = await User.find({});

            return res.render('home',{
                title: "Codial | Home",
                posts : posts,
                all_users:users
            });

    }catch(err){
        console.log('Error',err);
        return;
    }


    }
