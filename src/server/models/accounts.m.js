const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const cn = require('../configs/cnStr');
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
    
    byName: async (username)=>{
        const rs = await query.one(tb, 'username', username);
        return rs;
    },
    
    delByName:  async (username)=>{
        const rs = await query.del(tb, 'username', username)
        return rs;
    },
    
    getNumberOfAccounts: async () => {
        const count = await db.one('SELECT count(*) FROM public."Accounts"');
        return count;
    },

    filterByName: async (username) => { 
        let user = await query.all(tb);
        let us = user.filter((user) => user.username.includes(username))
        return us;
    }
};