module.exports.profile = function (req,res){

    return res.render("user_profile",{
        title:"user profile"
    });
}

module.exports.contact = function (req,res){
    return res.render("user_contact",{
        title:"user contact"
    });
}