class logoutC {
    async logout(req, res, next) {
        try {
            if (req.session.username) {
                delete req.session.username;
            }
            return res.redirect('/login');
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new logoutC();