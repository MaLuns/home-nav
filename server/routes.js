const Router = require('koa-router')
const { NavController, LinkClassController, UserController } = require('./controllers')
const apiRoute = new Router({ prefix: '/api' })

exports.api = apiRoute
    .post('/user/login', UserController.login)
    .post('/user/add', UserController.add)
    .get('/user/init', UserController.init)
    .get('/nav', NavController.list)
    .post('/nav/create', NavController.create)
    .delete('/nav', NavController.delete)
    .get('/linkclass', LinkClassController.list)
    .post('/linkclass/create', LinkClassController.create)
    .get('/linkclass/childen', LinkClassController.findByNavid)

