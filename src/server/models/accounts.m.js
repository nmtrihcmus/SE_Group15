const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const cn = require('../configs/cnStr');
const query = require('./query.m');
const movieM = require('./movies.m');
const db = pgp(cn);
const tb = 'Accounts'

module.exports = {
    all: async () => {
        const rs = await query.all(tb);
        return rs;
    },

    addAccount: async (user) => {
        const rs = await query.insert(tb, user);

        return rs;

    },

    byName: async (username) => {
        const rs = await query.one(tb, 'username', username);
        return rs;
    },

    delByName: async (username) => {
        const rs = await query.del(tb, 'username', username)
        return rs;
    },

    getNumberOfAccounts: async () => {
        const count = await db.one('SELECT count(*) FROM public."Accounts"');
        return count;
    },

    filterByName: async (username) => {
        let user = await query.all(tb);
        let us = user.filter((user) => user.username.includes(username) && user.isAdmin === false)
        return us;
    },

    update: async (username, newInfo) => {
        try {
            let q1 = await db.none('UPDATE "Accounts" SET "password" = $1 WHERE "username" = $2', [newInfo.password, username])
            let q2 = await db.none('UPDATE "Accounts" SET "fullname" = $1 WHERE "username" = $2', [newInfo.fullname, username])
            let q3 = await db.none('UPDATE "Accounts" SET "email" = $1 WHERE "username" = $2', [newInfo.email, username])
            let q4 = await db.none('UPDATE "Accounts" SET "username" = $1 WHERE "username" = $2', [newInfo.username, username])
            return true;
        }
        catch {
            return false;
        }
    },

    getFavoriteMovies: async (username) => {
        const movies = await query.any('favoriteMovies', 'username', username);
        let Ids = [];
        for (let element of movies)
            Ids.push(element.movieId)
        let favoriteMovies = []
        for (let Id of Ids) {
            try {
                let infoMovie = await movieM.findByID(Id);
                favoriteMovies.push(infoMovie);
            }
            catch {
                console.log("Khong tim thay", Id);
            }
        }
        return favoriteMovies;
    }
};