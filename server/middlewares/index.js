const koaJwt = require('koa-jwt')
const { pathToRegexp } = require('path-to-regexp')
let { jwtconfig } = require('../config.json')
const routes = require('../routes')

const regex = {
    integer: /^-?\d+$/,
    decimal: /^-?\d*\.?\d+$/,
    boolean: /^(true|false)$/,
    null: /^null$/,
    undefined: /^undefined$/,
};

/**
 * Format value
 * @param value
 * @return {*}
 */
const parseValue = (value) => {
    if (regex.integer.test(value)) {
        return parseInt(value, 10);
    } else if (regex.decimal.test(value)) {
        return parseFloat(value);
    } else if (regex.boolean.test(value)) {
        return value === 'true';
    } else if (regex.null.test(value)) {
        return null;
    } else if (regex.undefined.test(value)) {
        return undefined;
    }
    return value;
};

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

    static prettyQuery({ override = true } = {}) {
        return async (ctx, next) => {
            const query = ctx.query;
            const result = {};
            // Transform
            Object.keys(query).filter(n => n).forEach((key) => {
                const value = query[key];
                result[key] = Array.isArray(value) ? value.map(n => parseValue(n)) : parseValue(value);
            });
            // Assign
            if (override) {
                Object.assign(ctx.query, result);
            } else {
                ctx.prettyQuery = result;
            }
            await next();
        }
    }
}