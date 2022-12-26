const session = require('express-session');
module.exports = (app) => {
    //session
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
    secret: 'secret_session',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
    }))
};