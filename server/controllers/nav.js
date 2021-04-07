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
        let nav = await NavProxy.find(query)
        ctx.body = nav
    }

    static async delete(ctx) {
        const id = ctx.query.id
        let ope = await NavProxy.updateById(id, {
            delete: true
        })
        ctx.body = ope
    }

    static async create(ctx) {
        /* NavProxy.find({})
        await NavProxy.newAndSave() */
        console.log(ctx)
        ctx.body = 'xxx'
    }


    static async update(ctx) {
        const id = ctx.checkBody('id').notEmpty().value
        if (ctx.errors) {
            ctx.body = ctx.util.refail(null, 10001, ctx.errors)
            return;
        }
        let par = uitl.objFilterKey(ctx.request.body, ['title', 'url', 'delete', 'sort', 'blank'])
        let res = await NavProxy.updateById(id, par);
        if (res.ok) {
            ctx.body = ctx.util.resuccess('修改成功')
        } else {
            ctx.body = ctx.util.refail('修改失败')
        }
    }
}