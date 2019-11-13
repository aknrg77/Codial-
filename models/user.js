const mongoose = require('mongoose');

// uploading multer
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');  

var userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar :{
        type: String
    }

},{
    // for making an update and new datas in the schemas
    timestamps:true  
});

//using local storage for storing avatars
let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH));  //models + .. + uploads/user/avatrs
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now());
    }
});


//static methods
userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;







var User = mongoose.model('User',userSchema);

module.exports = User;