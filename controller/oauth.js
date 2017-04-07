'use strict'
const router = require('koa-router')();
const low = require('lowdb');
const uuid = require('uuid');
const db = low('db/db.json');

router.post('/access_token', function*() {
    switch(this.query.grant_type){
        case 'password':
            let user = db.get('users').find({mobile: this.query.username}).value();
            if(!user){
                this.status = 400;
                return this.body = {
                    name: 'Bad Request',
                    message: '不存在该用户名',
                    status:400
                };
            }
            if(user.password !== this.query.password) {
                this.status = 400;
                return this.body = {
                    name: 'Bad Request',
                    message: '密码不正确',
                    status:400
                };
            }
            let token  = getToken(user); 
            this.body = token;
            return this.status = 200;
    }
});

function getToken(user){
    let token = db.get('tokens').find({userId: user.id}).value();
    if(!token){
        token = {
            access_token: uuid.v1(),
            user_id: user.id,
            expires_in: 65535,
            token_type: 'accessToken',
            scope: 'global'
        }
        db.get('tokens').push(token).write();
        return token;
    }
    return token;
}

module.exports = router;