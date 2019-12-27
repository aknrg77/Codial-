const nodemailer = require ('nodemailer');
const ejs = require ('ejs');
const path = require('path');



let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',   // using SMTP to interact 
    port : 587,             //TLS most secure port
    secure : false, //true for 465 , false for other port 
    auth :{
        user : 'aknrg627',
        pass : 'Anurag@786'
    }
});


let renderTemplate = (data, relativePath ) =>{
    let mailHTML ;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering ejs file',err);
                return ;
            }
            console.log('mail rendered');
            mailHTML = template;
        }
    )
    return mailHTML;
}



module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}