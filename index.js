'use strict';
const Koa = require('koa');
const bodyParser = require('koa-body');
const app = new Koa();

app.use(bodyParser({multipart: true}));
const router = require('./router');

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log('listening on port 3000');

