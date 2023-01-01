const accountM = require('../models/accounts.m');

class accountC {
    async updateAccountPage(req, res, next){
        try {
            if (req.session.username && req.session.isAdmin) {
                return res.render('updateAccounts', {
                    title: "Update Accounts",
                    loggedIn: true,
                    isAdmin: req.session.isAdmin
                });
            }
            return res.redirect('home');
        }
        catch (error) {
            next(error);
        }
    }
    
    async updateAccount(req, res, next) {
        
    }

}

module.exports = new accountC();