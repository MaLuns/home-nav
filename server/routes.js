const Router = require('koa-router')
const { nav } = require('./controllers')
const apiRoute = new Router({ prefix: '/api' })

exports.api = apiRoute
    .get('/nav', nav.list)
    .post('/nav/create', nav.create)

