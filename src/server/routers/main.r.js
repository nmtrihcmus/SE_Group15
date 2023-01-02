const loginR = require('./login.r')
const registerR = require('./register.r')
const homeR = require('./home.r')
const logoutR = require('./logout.r')
const addAccountR = require('./addAccount.r')
const updateAccountR = require('./updateAccount.r')
const listAccountR = require('./listAccounts.r')
const accountR = require('./accounts.r');
const movieR = require('./movies.r');
const listR = require('./list.r')

function route(app) {
    app.use('/home', homeR);
    app.use('/register', registerR);
    app.use('/login', loginR);
    app.use('/', homeR);
    app.use('/logout', logoutR);
    app.use('/', movieR);
    app.use('/', accountR);
    app.use('/list', listR);
    
    app.use('/addAccounts', addAccountR);
    app.use('/updateAccounts', updateAccountR);
    app.use('/listAccounts', listAccountR);
}

module.exports = route;