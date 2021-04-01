const koa = require('koa');
const { Nuxt, Builder } = require('nuxt');
const config = require('../nuxt.config.js')
const routes = require('./routes')
const app = new koa()

const nuxt = new Nuxt(config)

if (config.dev) {
    const builder = new Builder(nuxt);
    builder.build();
}

app
    .use(routes.api.routes())
    .use(routes.api.allowedMethods())
    .use(ctx => {
        ctx.status = 200
        ctx.respond = false // 去掉koa 的响应
        nuxt.render(ctx.req, ctx.res)
    })
app.listen(config.env.port)




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