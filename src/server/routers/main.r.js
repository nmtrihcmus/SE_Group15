const loginR = require('./login.r')
const registerR = require('./register.r')
const homeR = require('./home.r')
const logoutR = require('./logout.r')
const addAccountR = require('./addAccount.r')
const updateAccountR = require('./updateAccount.r')
const listAccountR = require('./listAccounts.r')
const accountR = require('./accounts.r');
const movieR = require('./movies.r')

function route(app) {
    app.use('/home', homeR);
    app.use('/register', registerR);
    app.use('/login', loginR);
    app.use('/', loginR);
    app.use('/logout',logoutR)
    app.use('/addAccount', addAccountR);
    app.use('/updateAccount', updateAccountR);
    app.use('/listAccount', listAccountR);
    app.use('/', homeR);
    app.use('/logout', logoutR)
    app.use('/', movieR)
    app.use('/', accountR)
}

module.exports = route;