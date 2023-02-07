const { LinkProxy } = require('../proxy')
const uitl = require('../util')
const { ObjectID } = require('mongodb')

module.exports = class LinkController {

    static async list(ctx) {
        let par = uitl.objFilterKey(ctx.query, ['title', 'desc', 'size', 'index', 'delete', 'classID', 'status'])
        let query = uitl.pagesGeneration(par, ['classID'], ['delete'], ['status'])
        let nav = await LinkProxy.find(...query)
        ctx.body = nav
    }

    static async create(ctx) {
        const title = ctx.checkBody('title').notEmpty().value
        const url = ctx.checkBody('url').notEmpty().value
        if (ctx.errors) {
            ctx.body = ctx.util.refail(null, 10001, ctx.errors)
            return;
        }
        let par = uitl.objFilterKey(ctx.request.body, ['classID', 'logo', 'sort', 'desc'])
        let res = await LinkProxy.newAndSave({ url, title, ...par })
        ctx.body = ctx.util.resuccess(res)
    }

    static async update(ctx) {
        let body = ctx.request.body
        if (body.ids) {
            const ids = ctx.checkBody('ids').notEmpty().type('array').value
            if (ctx.errors) {
                ctx.body = ctx.util.refail(null, 10001, ctx.errors)
                return;
            }

            let par = uitl.objFilterKey(ctx.request.body, ['delete', 'status', 'classID'])
            par.classID = par.classID === -1 ? null : ObjectID(par.classID)

            let res = await LinkProxy.updateManyByIds(ids, par);
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
            let par = uitl.objFilterKey(ctx.request.body, ['title', 'url', 'logo', 'delete', 'sort', 'desc', 'status'])
            let res = await LinkProxy.updateById(id, par);
            if (res.ok) {
                ctx.body = ctx.util.resuccess('修改成功')
            } else {
                ctx.body = ctx.util.refail('修改失败')
            }
        }
    }

    static async delete(ctx) {
        const id = ctx.checkParams('id').notEmpty().value;
        if (ctx.errors) {
            ctx.body = ctx.util.refail(null, 10001, ctx.errors)
            return;
        }
        ctx.body = await LinkProxy.deleteByIds([id])
    }
}