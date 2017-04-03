'use strict'
const router = require('koa-router')();
const low = require('lowdb');
const db = low('db/db.json')

router.get('/', function* () {
    let count = db.get('products').size().value();
    let currentPage = (this.query.page || 1);
    let pageNumber = currentPage - 1;
    let pageSize = this.query.size || 10;
    let items = db.get('products').drop(pageSize * pageNumber).take(pageSize).value();
    let result = {
        items: items,
        // _links: {
        //     self: {
        //         href: 'http://api.beta.lazywaimai.com/v1/businesses?page=' + currentPage + '&size=' + pageSize,
        //     },
        //     next: {
        //         href: "http://api.beta.lazywaimai.com/v1/businesses?page=2&size=10"
        //     }, 
        //     last: {
        //         href: "http://api.beta.lazywaimai.com/v1/businesses?page=2&size=10"
        //     }
        // },
        // _meta: { 
        //     totalCount: count, 
        //     pageCount: items.length, currentPage: (pageNumber + 1), perPage: pageSize
        // }
    };
    // if(pageNumber > 0)
    //     result._links.last = {
    //         href: 'http://api.beta.lazywaimai.com/v1/businesses?page='2&size=10"
    //     }
    this.body = result;
});

module.exports = router;