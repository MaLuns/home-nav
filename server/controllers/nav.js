const { NavProxy } = require('../proxy');


module.exports = class NavController {

    static async list(ctx) {
        const keywords = ctx.query.keywords
        const url = ctx.query.url
        let query = {};
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
}