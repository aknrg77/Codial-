const nodemailer = require('../../config/nodemailer');



//module.exports = newComment (this is another way of exporting)
exports.newComment = (comment) => {

    // console.log('inside new comment mailer',comment);
    //sending template path and data 
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comments.ejs');

    nodemailer.transporter.sendMail({
        from : 'aknrg627@gmail.com',
        to :comment.user.email,
        subject : 'new comment published',
        html : htmlString
        },(err,info) => {
        if(err){console.log('Error in sending mail',err); return ;}
        console.log('messege sent',info);
        return ;
    });
}