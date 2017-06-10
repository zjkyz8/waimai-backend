'use strict'
const router = require('koa-router')();

router.post('/check', function* () {
    console.log(this.request.body);
    this.body = {
        last_address: {

        },
        online_payment: false,
        booking_time_list: [],
        cart_info: {

        },
        can_submit: true,
        
    };
    this.status = 201;
});

module.exports = router;