'use strict'
const router = require('koa-router')();
const low = require('lowdb');
const db = low('db/db.json')

router.get('/', function* () {
    let count = db.get('restaurants').size().value();
    let currentPage = (this.query.page || 1);
    let pageNumber = currentPage - 1;
    let pageSize = this.query.size || 10;
    let items = db.get('restaurants').drop(pageSize * pageNumber).take(pageSize).value();
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

router.get('/:id/products', function* (){
    let result = [];
    db.get('products').filter({business_id: parseInt(this.params.id)}).groupBy('category_id')
        .forIn((value, key) => {
            let category = db.get('categories').find({business_id: parseInt(this.params.id), id: parseInt(key)}).value();
            var a = {
                id: category.id,
                description: category.description,
                name: category.name,
                icon_url: category.icon_url,
                products: value
            }
            result.push(a);

        }).value();
    this.body = result;
});

module.exports = router;