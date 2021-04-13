const koaJwt = require('koa-jwt')
const { pathToRegexp } = require('path-to-regexp')
let { jwtconfig } = require('../config.json')
const routes = require('../routes')

const codeMap = {
    '-1': 'fail',
    '200': 'success',
    '401': 'token expired',
    '500': 'server error',
    '10001': 'params error'
}

const utilFn = {
    resuccess(data) {
        return {
            code: 200,
            success: true,
            message: codeMap['200'],
            data: data || null
        }
    },
    refail(message, code, data) {
        return {
            code: code || -1,
            success: false,
            message: message || codeMap[code],
            data: data || null
        }
    }
}

module.exports = class Middleware {
    static util(ctx, next) {
        ctx.set('X-Request-Id', ctx.req.id)
        ctx.util = utilFn
        return next()
    }

    static unless() {
        return koaJwt({
            secret: jwtconfig.secret,
            getToken: (ctx) => ctx.cookies.get('token')
        }).unless((ctx) => {
            if (/^\/api/.test(ctx.path)) {
                return pathToRegexp(routes.unlessRoute[ctx.req.method.toLocaleUpperCase()]).test(ctx.path);
            }
            return true
        })
    }

    static notAuthHandle(ctx, next) {
        return next().catch((err) => {
            if (401 == err.status) {
                ctx.status = 200;
                ctx.body = ctx.util.refail('未登录用户', 401);
            } else {
                throw err;
            }
        });
    }
}