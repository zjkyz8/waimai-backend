'use strict'
const router = require('koa-router')();
const low = require('lowdb');
const db = low('db/db.json');

router.post('/', function* () {
    
    switch(this.query.action){
        case 'send_code': 
            this.body = generateVerifyCode(this.request.body.mobile);
            break;
        case 'verify_code':
            this.body = verfiyCode(this.request.body.mobile, this.request.body.code);
            break;
    }
    this.status = 200;
});

function generateVerifyCode(mobile){
    let verifyCode = getVerifyCode(6);
    db.get('verifyCodes').push({mobile: mobile, verifyCode: verifyCode}).write();
    console.log('mobile: ', mobile);
    console.log('verifyCode: ', verifyCode);
    return true;
}

function verfiyCode(mobile, code){
    let verifyCode = db.get('verifyCode').find({mobile: mobile, verifyCode: code}).value();
    if(verifyCode){
        db.get('verifyCodes').remove({mobile: mobile, verifyCode: code}).write();
        return true;
    }
    return false;
}

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