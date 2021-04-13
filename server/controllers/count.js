const { CountProxy } = require('../proxy');

module.exports = class CountController {

    static async add(ctx) {
        const linkID = ctx.checkBody('linkID').notEmpty().value
        if (ctx.errors) {
            ctx.body = ctx.util.refail(null, 10001, ctx.errors)
            return;
        }
        ctx.body = CountProxy.update(linkID)
    }

}