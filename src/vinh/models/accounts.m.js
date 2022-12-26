const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const cn = require('../config/connectStr');
const query = require('./query.m');
const db = pgp(cn);
const tb = 'Accounts'

module.exports = {
    all: async ()=>{
        const rs = await query.all(tb);
        return rs;
    },

    addUser: async (user)=>{
        const rs = await query.insert(tb, user);
        
        return rs;
        
    },
    findByName: async (username)=>{
        const rs = await query.one(tb, 'username', username);
        return rs;
    }
    ,
    delByName:  async (username)=>{
        const rs = await query.del(tb, 'username', username)
        return rs;
    }
};