'use strict'
const low = require('lowdb');
const db = low('db/db.json');

module.exports = {
    mapTokenToUser: function(token) {
        token = token.replace('Bearer ', '');
        let tokenObj = db.get('tokens').find({access_token: token}).value();
        return tokenObj ? tokenObj.user_id : '';
    }
};