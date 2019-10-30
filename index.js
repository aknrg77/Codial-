const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;
// importing the ejs layout
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');


app.use(express.urlencoded());
app.use(cookieParser());

//extract styles and scripts from sub pages into the layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);


// using the expressLayout using before the route
app.use(expressLayout);

// using express router
app.use('/',require('./routes'))



//setting up the view engine
app.set('view engine','ejs');
app.set('views', './views');


//setting up the static file
app.use(express.static('./assets'));



app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});