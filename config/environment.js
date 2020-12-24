//containing environment during production
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname,'../production_logs');

fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval : '1d',
    path : logDirectory
});



const development = {
    name : 'development',
    assetPath : './assets',
    sessionCookieKey:'something',
    db : 'codiel_development',
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',   // using SMTP to interact 
        port : 587,             //TLS most secure port
        secure : false, //true for 465 , false for other port 
        auth :{
            user : '',
            pass : ''
        }
    },

    google_clientID:"686870845418-1js0blnggb9qafffd6htdtvh541elh3o.apps.googleusercontent.com",
    google_clientSecret: "CradVusXWGQ_Cfj7MqiOLQhm",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",

    jwt_secret_key: 'codial',
    morgan : {
        mode : 'dev',
        options : {stream :accessLogStream}
    }
    
}

const production = {
    name : 'production',
    assetPath : process.env.CODIAL_ASSET_PATH,
    sessionCookieKey:process.env.CODIAL_SESSION_COOKIE_KEY, 
    db : process.env.CODIAL_DB,
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',   // using SMTP to interact 
        port : 587,             //TLS most secure port
        secure : false, //true for 465 , false for other port 
        auth :{
            user : process.env.CODIAL_USER,
            pass : process.env.CODIAL_PASSWORD
        }
    },

    google_clientID:process.env.CODIAL_GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.CODIAL_CLIENT_SECRET,
    google_callbackURL: process.env.CODIAL_CALLBACKURL,

    jwt_secret_key: process.env.CODIAL_JWT_SECRET_KEY,
    morgan : {
        mode : 'combined',
        options : {stream :accessLogStream}
    }
}


//module.exports = development;

module.exports = eval(process.env.CODIAL_ENVIRONMENT)== undefined ? development : production;
