'use strict'
const router = require('koa-router')();
const AuthService = require('../service/auth-service');
const low = require('lowdb');
const db = low('db/db.json');
db._.mixin(require('lodash-id'));

router.get('/', function* () {
    let userId = AuthService.mapTokenToUser(this.request.header.authorization);
    if(!userId){
        this.body = {
            name: 'Unauthorized',
            message: '无效的Access Token.',
            status: 401
        };
        return this.status = 401;
    }
    this.body = db.get('addresses').filter({user_id: userId}).value();
    this.status = 201;
});

router.post('/', function* () {
    let userId = AuthService.mapTokenToUser(this.request.header.authorization);
    if(!userId){
        this.body = {
            name: 'Unauthorized',
            message: '无效的Access Token.',
            status: 401
        };
        return this.status = 401;
    }
    this.request.body.user_id = userId;
    this.body = db.get('addresses').insert(this.request.body).write();
    this.status = 201;
});

router.patch('/:id', function* () {
    this.body = db.get('addresses').getById(this.params.id).assign(this.request.body).write();
    this.status = 200;
});

router.delete('/:id', function* () {
    this.body = db.get('addresses').remove({id: this.params.id}).write();
    this.status = 204;
});

module.exports = router;