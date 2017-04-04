'use strict'
const router = require('koa-router')();

router.post('/', function* () {
    this.status = 201;
    this.body = {};
});

module.exports = router;