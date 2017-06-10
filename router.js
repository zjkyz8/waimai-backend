'use strict'
const router = require('koa-router')();
const RestaurantController = require('./controller/restaurant');
const FeedbackController = require('./controller/feedback');
const UserController = require('./controller/user');
const OauthController = require('./controller/oauth');
const AddressController = require('./controller/address');
const OrderController = require('./controller/order');

router.use('/restaurant', RestaurantController.routes()).use(RestaurantController.allowedMethods());
router.use('/feedbacks', FeedbackController.routes()).use(FeedbackController.allowedMethods());
router.use('/users', UserController.routes()).use(UserController.allowedMethods());
router.use('/oauth', OauthController.routes()).use(OauthController.allowedMethods());
router.use('/addresses', AddressController.routes()).use(AddressController.allowedMethods());
router.use('/orders', OrderController.routes()).use(OrderController.allowedMethods());

module.exports = router;