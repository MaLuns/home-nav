const { LinkClassProxy } = require('../proxy');
const uitl = require('../util')
const { ObjectID } = require('mongodb')

module.exports = class LinkClassController {

    static async list(ctx) {
        let par = uitl.objFilterKey(ctx.query, ['title', 'desc', 'size', 'index', 'delete', 'navID'])
        let query = uitl.pagesGeneration(par, ['navID'], ['delete'])
        let nav = await LinkClassProxy.find(...query)
        ctx.body = nav
    }

    static async create(ctx) {
        const title = ctx.checkBody('title').notEmpty().value
        if (ctx.errors) {
            ctx.body = ctx.util.refail(null, 10001, ctx.errors)
            return;
        }
        let par = uitl.objFilterKey(ctx.request.body, ['sort', 'desc'])
        let res = await LinkClassProxy.newAndSave({ title, ...par })
        ctx.body = ctx.util.resuccess(res)
    }

    static async update(ctx) {
        let body = ctx.request.body
        if (body.navID) {
            const navID = ctx.checkBody('navID').notEmpty().value
            const ids = ctx.checkBody('ids').notEmpty().type('array').value
            if (ctx.errors) {
                ctx.body = ctx.util.refail(null, 10001, ctx.errors)
                return;
            }
            let res = await LinkClassProxy.updateManyByIds(ids, { navID: navID === -1 ? null : ObjectID(navID) });
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
            let res = await LinkClassProxy.updateById(id, par);
            if (res.ok) {
                ctx.body = ctx.util.resuccess('修改成功')
            } else {
                ctx.body = ctx.util.refail('修改失败')
            }
        }
    }

    static async findByNavid(ctx) {
        const id = ctx.checkQuery('id').notEmpty().value
        if (ctx.errors) {
            ctx.body = ctx.util.refail(null, 10001, ctx.errors)
            return;
        }
        let list = await LinkClassProxy.findByNavid(id);
        ctx.body = list;
    }

    static async delete(ctx) {
        const id = ctx.checkParams('id').notEmpty().value;
        if (ctx.errors) {
            ctx.body = ctx.util.refail(null, 10001, ctx.errors)
            return;
        }
        ctx.body = await LinkClassProxy.deleteByIds([id])
    }
}