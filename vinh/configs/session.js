const session = require('express-session');

module.exports = app => {
    const oneDay = 1000 * 60 * 60 * 24;
    app.use(session({
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false
    }));
}