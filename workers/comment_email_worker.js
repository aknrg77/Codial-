// sending email via kue worker (delayed emails)
const queue = require('../config/kue');

const commentsMailer = require('../config/mailers/comments_mailer');

queue.process('emails' , function (job,done) {
    //comment
    console.log('email worker is processing a job ', job.data);
    commentsMailer.newComment(job.data);
    done();
  });

