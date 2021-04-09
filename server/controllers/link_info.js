const { LinkProxy } = require('../proxy')
const uitl = require('../util')
const { ObjectID } = require('mongodb')

module.exports = class LinkController {

    static async list(ctx) {
        let par = uitl.objFilterKey(ctx.query, ['title', 'desc', 'size', 'index'])
        let query = uitl.pagesGeneration(par)
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
        let par = uitl.objFilterKey(ctx.request.body, ['logo', 'sort', 'desc'])
        let res = await LinkProxy.newAndSave({ url, title, ...par })
        ctx.body = ctx.util.resuccess(res)
        ctx.body = 'xxx'
    }

    static async update(ctx) {
        let body = ctx.request.body
        if (body.classID) {
            const classID = ctx.checkBody('classID').notEmpty().value
            const ids = ctx.checkBody('ids').notEmpty().type('array').value
            if (ctx.errors) {
                ctx.body = ctx.util.refail(null, 10001, ctx.errors)
                return;
            }
            let res = await LinkProxy.updateManyByIds(ids, { classID: ObjectID(classID) });
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
            let par = uitl.objFilterKey(ctx.request.body, ['title', 'url', 'logo', 'delete', 'sort', 'desc'])
            let res = await LinkProxy.updateById(id, par);
            if (res.ok) {
                ctx.body = ctx.util.resuccess('修改成功')
            } else {
                ctx.body = ctx.util.refail('修改失败')
            }
        }
    }

    static async delete(ctx) {
        const id = ctx.query.id
        let ope = await LinkProxy.updateById(id, {
            delete: true
        })
        ctx.body = ope
    }

}