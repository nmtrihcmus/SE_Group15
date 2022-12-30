const userM = require('../models/accounts.m');

class accountC {
    async interface(req, res, next){
        try {
            if (req.session.username && req.session.isAdmin) {
                return res.render('home', {
                    title: "Home",
                    loggedIn: true,
                    isAdmin: req.session.isAdmin,
                    homePage: false,
                    updateAccounts: true
                });
            }
            return res.redirect('home');
        }
        catch (error) {
            next(error);
        }
    }
    
    async updateAccounts(req, res, next) {
        
    }

}

module.exports = new accountC();