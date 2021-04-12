const consola = require('consola');
const koa = require('koa');
const bodyParser = require('koa-bodyparser')
const koaJwt = require('koa-jwt')
const { pathToRegexp } = require('path-to-regexp')
const { Nuxt, Builder } = require('nuxt');

const config = require('../nuxt.config.js')
const routes = require('./routes')
const middlewares = require('./middlewares')
let { jwtconfig } = require('./config.json')
const app = new koa()
const nuxt = new Nuxt(config)
require('koa-validate')(app)


const start = async () => {
    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    }

    app
        .use(middlewares.util)
        .use(koaJwt({
            secret: jwtconfig.secret,
            getToken: (ctx) => ctx.cookies.get('token')
        }).unless((ctx) => {
            if (/^\/api/.test(ctx.path)) {
                return pathToRegexp(routes.unlessRoute[ctx.req.method.toLocaleUpperCase()]).test(ctx.path);
            }
            return true
        }))
        .use(bodyParser())
        .use(routes.api.routes())
        .use(routes.api.allowedMethods())
        .use(ctx => {
            ctx.status = 200
            ctx.respond = false // 去掉koa 的响应
            nuxt.render(ctx.req, ctx.res)
        })
    app.listen(config.env.port, '0.0.0.0')
    consola.ready({
        message: `Server listening on http://localhost:${config.env.port}`,
        badge: true
    })
}

start()





/* const http = require('http')
const { Nuxt, Builder } = require('nuxt');
const config = require('../nuxt.config.js')

const nuxt = new Nuxt(config)
const builder = new Builder(nuxt);

builder.build().then(() => {
    http.createServer(function (req, res) {
        console.log(req.url)
        nuxt.render(req, res)
    }).listen(config.env.port)
}) */