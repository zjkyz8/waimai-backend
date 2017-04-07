'use strict'
const router = require('koa-router')();
const low = require('lowdb');
const db = low('db/db.json');
db._.mixin(require('lodash-id'));

router.post('/', function* () {
    
    switch(this.query.action){
        case 'send_code': 
            this.body = generateVerifyCode(this.request.body.mobile);
            break;
        case 'verify_code':
            this.body = verfiyCode(this.request.body.mobile, this.request.body.code);
            break;
        case 'create_user': 
            this.body = createUser(this.request.body.mobile, this.request.body.password);
            break;
    }
    this.status = 200;
});

router.get('/:id', function* (){
    let user = db.get('users').getById(this.params.id).value();
    this.body = user;
    this.status = 200;
});

function createUser(mobile, password){
    let user = db.get('users').find({mobile: mobile}).value();
    if(user){
        db.get('users').find({mobile: mobile}).assign({ password: password}).write()
    } else

        db.get('users').insert({mobile: mobile, password: password}).write();
    return true
}

function generateVerifyCode(mobile){
    let verifyCode = getVerifyCode(6);
    db.get('verifyCodes').push({mobile: mobile, verifyCode: verifyCode}).write();
    console.log('mobile: ', mobile);
    console.log('verifyCode: ', verifyCode);
    return true;
}

function verfiyCode(mobile, code){
    let verifyCode = db.get('verifyCodes').find({mobile: mobile, verifyCode: code}).value();
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