class logoutC {
    async logout(req, res, next) {
        try {
            if (req.session.username) {
                delete req.session.isAdmin;
                delete req.session.username;
            }
            return res.redirect('/home');
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new logoutC();