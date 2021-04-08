const consola = require('consola');
const koa = require('koa');
const bodyParser = require('koa-bodyparser')
const { Nuxt, Builder } = require('nuxt');
const config = require('../nuxt.config.js')
const routes = require('./routes')
const middlewares = require('./middlewares')
const app = new koa()
const nuxt = new Nuxt(config)
require('koa-validate')(app)
/* const { Validator } = require('koa-validate')

~(function () {
    app.context.checkBodyArr = function (key, transFn) {
        var body = this.request.body;
        if (!body) {
            if (!this.errors) {
                this.errors = ['no body to check!'];
            }
            return new Validator(this, null, null, false, null, false);
        }
        // 数组
        let arr = []
        body.forEach(item => {
            arr.push(new Validator(this, key, getValue(item, key, transFn), hasKey(item, key, transFn), item));
        });
        console.log(arr)
    }
})() */

const start = async () => {
    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    }

    app
        .use(middlewares.util)
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