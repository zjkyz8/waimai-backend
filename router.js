'use strict'
const router = require('koa-router')();
const ProductController = require('./controller/product');

router.use('/businesses', ProductController.routes()).use(ProductController.allowedMethods());

module.exports = router;