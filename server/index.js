const consola = require('consola');
const koa = require('koa');
const bodyParser = require('koa-bodyparser')
const { Nuxt, Builder } = require('nuxt');
let { server } = require('./config.json')

const nuxtConfig = require('../nuxt.config.js')
const routes = require('./routes')
const middlewares = require('./middlewares')
const app = new koa()
const nuxt = new Nuxt(nuxtConfig)
require('koa-validate')(app)


const start = async () => {
    if (nuxtConfig.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    }

    app
        .use(middlewares.util)
        .use(middlewares.notAuthHandle)
        .use(middlewares.unless())
        .use(bodyParser())
        .use(routes.api.routes())
        .use(routes.api.allowedMethods())
        .use(ctx => {
            ctx.status = 200
            ctx.respond = false // 去掉koa 的响应
            nuxt.render(ctx.req, ctx.res)
        })
        .listen(server.port, '0.0.0.0')
    consola.ready({
        message: `Server listening on http://localhost:${server.port}`,
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