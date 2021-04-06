const { UserProxy } = require('../proxy');
const jwt = require('jsonwebtoken')
const util = require('../util')
let jwtconfig = {
    "expire": "14 days",
    "secret": "shared-secret"
}
module.exports = class UserController {

    static async login(ctx) {
        const name = ctx.checkBody('name').notEmpty().value
        const password = ctx.checkBody('password').notEmpty().value
        if (ctx.errors) {
            ctx.body = ctx.util.refail(null, 10001, ctx.errors)
            return;
        }
        let user = await UserProxy.find({ name })
        if (!user) {
            ctx.body = ctx.util.refail('用户不存在')
            return
        }

        if (!util.bcompare(password, user.password)) {
            ctx.body = ctx.util.refail('用户名或密码错误')
            return
        }

        ctx.body = ctx.util.resuccess({
            id: user.id,
            name: user.name,
            token: jwt.sign({ id: user.id }, jwtconfig.secret, { expiresIn: jwtconfig.expire })
        })
    }

    static async init(ctx) {
        let count = await UserProxy.find().countDocuments()
        ctx.body = ctx.util.resuccess(count > 0)
    }

    static async add(ctx) {
        let count = await UserProxy.find().countDocuments()
        if (count > 0) {
            ctx.body = ctx.util.refail('', 401)
            return
        }

        const name = ctx.checkBody('name').notEmpty().value
        const password = ctx.checkBody('password').notEmpty().value
        if (ctx.errors) {
            ctx.body = ctx.util.refail(null, 10001, ctx.errors)
            return;
        }

        let user = await UserProxy.add({
            name,
            password: util.bhash(password)
        })
        if (!user) {
            ctx.body = ctx.util.refail('账户创建失败')
            return
        }

        ctx.body = ctx.util.resuccess({
            id: user.id,
            name: user.name,
            token: jwt.sign({ id: user.id }, jwtconfig.secret, { expiresIn: jwtconfig.expire })
        })
    }

}