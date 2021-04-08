const { LinkClassProxy } = require('../proxy');
const uitl = require('../util')
const { Validator } = require('koa-validate')

module.exports = class LinkClassController {

    static async list(ctx) {
        let par = uitl.objFilterKey(ctx.query, ['title', 'desc', 'size', 'index'])
        let query = uitl.parameterGeneration(par)
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

    static async delete(ctx) {
        const id = ctx.query.id
        let ope = await LinkClassProxy.updateById(id, {
            delete: true
        })
        ctx.body = ope
    }

    static async update(ctx) {
        if (Array.isArray(ctx.request.body)) {
            array.forEach(element => {

            });
            ctx.checkBody('id').notEmpty()
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
}