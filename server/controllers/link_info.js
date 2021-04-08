const { LinkProxy } = require('../proxy')
const uitl = require('../util')

module.exports = class LinkController {

    static async list(ctx) {
        let par = uitl.objFilterKey(ctx.query, ['title', 'desc', 'size', 'index'])
        let query = uitl.parameterGeneration(par)
        let nav = await LinkProxy.find(...query)
        ctx.body = nav
    }

    static async create(ctx) {
        ctx.body = 'xxx'
    }

    static async update(ctx) {
        ctx.body = 'xxx'
    }

    static async delete(ctx) {
        ctx.body = 'xxx'
    }

}