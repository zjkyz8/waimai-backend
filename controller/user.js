'use strict'
const router = require('koa-router')();
const low = require('lowdb');
const db = low('db/db.json');

router.post('/', function* () {
    let verifyCode = getVerifyCode(6);

    db.get('verifyCodes').push({mobile: this.request.body.mobile, verifyCode: verifyCode}).write();
    this.status = 200;
    this.body = true;
    console.log('mobile: ', this.request.body.mobile);
    console.log('verifyCode: ', verifyCode);
});

function getVerifyCode(length) {
    var defaultLength = 6;
    var codeLength = length ? length : defaultLength;
    var numbers = new Array(codeLength);
    for (var i = 0; i < numbers.length; i++) {
        numbers[i] = Math.floor(Math.random() * (9 + 1));
    }
    return numbers.join('');
}

module.exports = router;