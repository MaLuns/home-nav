const Router = require('koa-router')
const { NavController, LinkClassController, UserController, LinkController, CountController } = require('./controllers')
const apiRoute = new Router({ prefix: '/api' })

exports.api = apiRoute
    .post('/user/login', UserController.login)
    .post('/user/add', UserController.add)
    .get('/user/init', UserController.init)
    .get('/user/out', UserController.out)

    .get('/nav', NavController.list)
    .post('/nav', NavController.create)
    .delete('/nav/:id', NavController.delete)
    .put('/nav', NavController.update)

    .get('/linkclass', LinkClassController.list)
    .post('/linkclass', LinkClassController.create)
    .delete('/linkclass/:id', LinkClassController.delete)
    .put('/linkclass', LinkClassController.update)
    .get('/linkclass/childen', LinkClassController.findByNavid)

    .get('/link', LinkController.list)
    .post('/link', LinkController.create)
    .delete('/link/:id', LinkController.delete)
    .put('/link', LinkController.update)

    .put('/count', CountController.add)


// 无需登录路由
exports.unlessRoute = {
    GET: [
        '/api/user/init',
        '/api/linkclass/childen',
        '/api/nav',
        '/api/count'
    ],
    POST: [
        '/api/user/login',
        '/api/user/add'
    ],
    PUT: [
        '/api/count'
    ],
    DELETE: []
}