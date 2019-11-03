const mongoose = require('mongoose');

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
    }

},{
    // for making an update and new datas in the schemas
    timestamps:true  
});

var User = mongoose.model('User',userSchema);

module.exports = User;