const dotenv = require('dotenv');
dotenv.config();
const express = require('express'),
    app = express(),
    signupR = require('./routers/signup.r'),
    signinR = require('./routers/signin.r'),
    logoutR = require('./routers/logout.r'),
    homeR = require('./routers/home.r'),
    bodyParser = require("body-parser");

require('./config/handlebars')(app);
require('./config/session')(app);
require('./config/passport')(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
    
//Static
app.use(express.static(__dirname + '/public'));


// routes
app.get('/', homeR);
app.use('/signup', signupR);
app.use('/signin', signinR);
app.use('/logout', logoutR);
app.use('/home', homeR);

//Error handling
app.use((req, res, next)=>{
    next(new Error("Page not found"));
})
app.use((err, req, res, next)=>{
    res.status(500).send(err.message);
})

const port = process.env.PORT || 3000;
const hostname = '127.0.0.1';
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//Run as admin :
//Set-ExecutionPolicy -ExecutionPolicy  Unrestricted -Scope Process