'use strict'
const router = require('koa-router')();
const RestaurantController = require('./controller/restaurant');
const FeedbackController = require('./controller/feedback');

router.use('/restaurant', RestaurantController.routes()).use(RestaurantController.allowedMethods());
router.use('/feedbacks', FeedbackController.routes()).use(FeedbackController.allowedMethods());

module.exports = router;