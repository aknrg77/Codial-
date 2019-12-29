const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;


//importing environment file
const env = require('./config/environment');
const logger = require('morgan');
require('./config/view-helpers')(app);


// importing the ejs layout
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');


//requiring the session cookie
const session = require('express-session');
// requiring passport and it's statergies (local , jwt)
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-stratergy');
const googleStrategy = require('./config/passport-google-oauth2-strategy');


//saving the users information (don't need to login ) after server restart
const MongoStore = require('connect-mongo')(session);


//requiring the node-saas-middleware
const nodeSassMiddleware = require('node-sass-middleware');

//requirng the connect-flash package
const flash = require('connect-flash');
const customMWare = require('./config/middleware');

// requiring and setting up chat module with socket.io and http ----//
const http = require('http').createServer(app);
const chatSockets = require('./config/chat_sockets.io').chatSockets(http);
http.listen(5000,function(){
    console.log("Chat Server is listening on port:5000");
});

//-----//
const path = require('path');


if(env.name=='development'){
//using the scss middleware
app.use(nodeSassMiddleware({
    //options
    src: path.join(__dirname, env.assetPath, '/scss'),
    dest:path.join(__dirname, env.assetPath, '/css'),
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'

}));
}


app.use(express.urlencoded());
app.use(cookieParser());

//setting up the static file
app.use(express.static(__dirname+env.assetPath));  
///uploads/users/avatars/avatar-1573587655996 make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode,env.morgan.options));

//extract styles and scripts from sub pages into the layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);


// using the expressLayout using before the route
app.use(expressLayout);




//setting up the view engine
app.set('view engine','ejs');
app.set('views', './views');

//setting up the middleware to encrypt cookies
//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codial',
    //TODO change the secret before deployement in production mode
    secret: env.sessionCookieKey,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
    //mongo store needs this argument store
    ,
    store: new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
        function (err){
            console.log(err || 'connect-mongodb setup is ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser); //always checking for a session cookie (middleware)

//setting up the connect-flash package
app.use(flash());
app.use(customMWare.setFlash);


// using express router
app.use('/',require('./routes'))





app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});