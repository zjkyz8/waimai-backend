'use strict'
const router = require('koa-router')();
const RestaurantController = require('./controller/restaurant');
const FeedbackController = require('./controller/feedback');
const UserController = require('./controller/user');

router.use('/restaurant', RestaurantController.routes()).use(RestaurantController.allowedMethods());
router.use('/feedbacks', FeedbackController.routes()).use(FeedbackController.allowedMethods());
router.use('/users', UserController.routes()).use(UserController.allowedMethods());

module.exports = router;