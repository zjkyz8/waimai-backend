'use strict'
const router = require('koa-router')();
const AuthService = require('../service/auth-service');
const low = require('lowdb');
const db = low('db/db.json');
const uuid = require('uuid');
db._.mixin(require('lodash-id'));

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

router.post('/:id/favorite', function* (){
    let userId = AuthService.mapTokenToUser(this.request.header.authorization);
    if(!userId){
        this.body = {
            name: 'Unauthorized',
            message: '无效的Access Token.',
            status: 401
        };
        return this.status = 401;
    }
    let user = db.get('users').getById(userId).value();
    let favorites = user.favorites || [];
    let id = uuid();
    favorites.push({id: id, business_id: this.params.id});
    db.get('users').getById(userId).assign({favorites: favorites}).write();
    this.status = 201;
    this.body = {
        id: id,
        business_info: db.get('restaurants').getById(this.params.id).value()
    };
});

module.exports = router;