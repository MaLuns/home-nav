const { LinkClassProxy } = require('../proxy');


module.exports = class LinkClassController {

    static async list(ctx) {
        const keywords = ctx.query.keywords
        let query = keywords ? {
            title: {
                $regex: keywords, $options: 'i'
            }
        } : {}
        let nav = await LinkClassProxy.find(query)
        ctx.body = nav
    }

    static async create(ctx) {
        ctx.body = 'xxx'
    }


    static async findByNavid(ctx) {
        const id = ctx.query.id
        let list = await LinkClassProxy.findByNavid(id);
        ctx.body = list;
    }
}