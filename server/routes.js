const Router = require('koa-router')
const { NavController, LinkClassController, UserController } = require('./controllers')
const apiRoute = new Router({ prefix: '/api' })

exports.api = apiRoute
    .post('/user/login', UserController.login)
    .post('/user/add', UserController.add)
    .get('/user/init', UserController.init)

    .get('/nav', NavController.list)
    .post('/nav', NavController.create)
    .delete('/nav', NavController.delete)
    .put('/nav', NavController.update)

    .get('/linkclass', LinkClassController.list)
    .post('/linkclass', LinkClassController.create)
    .delete('/linkclass', LinkClassController.delete)
    .put('/linkclass', LinkClassController.update)
    .get('/linkclass/childen', LinkClassController.findByNavid)

