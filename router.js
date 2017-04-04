'use strict'
const router = require('koa-router')();
const RestaurantController = require('./controller/restaurant');

router.use('/restaurant', RestaurantController.routes()).use(RestaurantController.allowedMethods());

module.exports = router;