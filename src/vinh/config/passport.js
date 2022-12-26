const passport = require('passport');
const bcrypt = require('bcrypt');
const userM = require('../models/accounts.m');
var LocalStrategy = require('passport-local').Strategy;
module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
    //
    passport.serializeUser(function (user, done) {
        done(null, user.username);//thành phần thêm vào session
    });

    passport.deserializeUser(async function (un, done) {
        try {
            const user = await userM.byName(un);
            done(null, user);
            
        } catch (err) {
            console.log('pass error');
            done(err, null);
        }
        
    });
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            
            try {
                const user = await userM.byName(username);
                if (!user) { return done(null, false); }
                const match = await bcrypt.compare(password, user.password);
                if (!match) { return done(null, false); }
                return done(null, user);
            } catch (err) {
                return done(err); 
            }
        }
      ));

}