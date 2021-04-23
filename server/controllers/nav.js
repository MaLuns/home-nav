const { NavProxy } = require('../proxy');
const uitl = require('../util')

module.exports = class NavController {

    static async list(ctx) {
        const keywords = ctx.query.keywords
        const url = ctx.query.url
        const all = ctx.query.all
        let query = {};
        // 未登录的只能查 启用的
        if (!all) {
            query.delete = false
        }
        if (url) {
            query.url = url
        }
        if (keywords) {
            query.title = {
                $regex: keywords, $options: 'i'
            }
        }
        ctx.body = await NavProxy.find(query)
    }

    static async delete(ctx) {
        const id = ctx.checkQuery('id').notEmpty().value
        if (ctx.errors) {
            ctx.body = ctx.util.refail(null, 10001, ctx.errors)
            return;
        }
        ctx.body = await NavProxy.updateById(id, { delete: true })
    }

    static async create(ctx) {
        const title = ctx.checkBody('title').notEmpty().value
        const url = ctx.checkBody('url').notEmpty().value
        if (ctx.errors) {
            ctx.body = ctx.util.refail(null, 10001, ctx.errors)
            return;
        }
        let nav = await NavProxy.find({ url })
        if (nav.length > 0) {
            ctx.body = ctx.util.resuccess('当前路径已存在')
            return;
        }
        let par = uitl.objFilterKey(ctx.request.body, ['sort', 'blank', 'isDesc'])
        let res = await NavProxy.newAndSave({ title, url, ...par })
        ctx.body = ctx.util.resuccess(res)
    }


    static async update(ctx) {
        const id = ctx.checkBody('id').notEmpty().value
        if (ctx.errors) {
            ctx.body = ctx.util.refail(null, 10001, ctx.errors)
            return;
        }
        let par = uitl.objFilterKey(ctx.request.body, ['title', 'url', 'delete', 'sort', 'blank', 'isDesc'])
        if (par.url) {
            let navs = await NavProxy.find({
                url: par.url,
                _id: {
                    $ne: id
                }
            })
            if (navs.length > 0) {
                ctx.body = ctx.util.refail('当前路径已存在')
                return;
            }
        }
        let res = await NavProxy.updateById(id, par);
        if (res.ok) {
            ctx.body = ctx.util.resuccess('修改成功')
        } else {
            ctx.body = ctx.util.refail('修改失败')
        }
    }
}