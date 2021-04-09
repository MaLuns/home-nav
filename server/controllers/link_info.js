const { LinkProxy } = require('../proxy')
const uitl = require('../util')

module.exports = class LinkController {

    static async list(ctx) {
        let par = uitl.objFilterKey(ctx.query, ['title', 'desc', 'size', 'index'])
        let query = uitl.pagesGeneration(par)
        let nav = await LinkProxy.find(...query)
        ctx.body = nav
    }

    static async create(ctx) {
        ctx.body = 'xxx'
    }

    static async update(ctx) {
        let body = ctx.request.body
        if (body.navID) {
            const navID = ctx.checkBody('classID').notEmpty().value
            const ids = ctx.checkBody('ids').notEmpty().type('array').value
            if (ctx.errors) {
                ctx.body = ctx.util.refail(null, 10001, ctx.errors)
                return;
            }
            let res = await LinkProxy.updateManyByIds(ids, { classID: ObjectID(navID) });
            if (res.ok) {
                ctx.body = ctx.util.resuccess('修改成功')
            } else {
                ctx.body = ctx.util.refail('修改失败')
            }
        } else {
            const id = ctx.checkBody('id').notEmpty().value
            if (ctx.errors) {
                ctx.body = ctx.util.refail(null, 10001, ctx.errors)
                return;
            }
            let par = uitl.objFilterKey(ctx.request.body, ['title', 'delete', 'sort', 'desc'])
            let res = await LinkProxy.updateById(id, par);
            if (res.ok) {
                ctx.body = ctx.util.resuccess('修改成功')
            } else {
                ctx.body = ctx.util.refail('修改失败')
            }
        }
    }

    static async delete(ctx) {
        ctx.body = 'xxx'
    }

}