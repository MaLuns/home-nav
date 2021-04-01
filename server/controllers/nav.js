const { NavProxy } = require('../proxy');


module.exports = class NavController {

    static async list(ctx) {
        const keywords = ctx.query.keywords
        let query = keywords ? {
            title: {
                $regex: keywords, $options: 'i'
            }
        } : {}
        let nav = await NavProxy.find(query)
        ctx.body = nav
    }

    static async create(ctx) {
        /* NavProxy.find({

        })
        await NavProxy.newAndSave() */
        console.log(ctx)
        ctx.body = 'xxx'
    }
}