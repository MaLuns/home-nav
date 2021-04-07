const { LinkClassProxy } = require('../proxy');
const uitl = require('../util')

module.exports = class LinkClassController {

    static async list(ctx) {
        let par = uitl.objFilterKey(ctx.query, ['keywords', 'size', 'index'])
        let query = par.keywords ? {
            title: {
                $regex: keywords, $options: 'i'
            }
        } : {}
        let nav = await LinkClassProxy.find(query).skip(1).limit(10)
        ctx.body = nav
    }

    static async create(ctx) {
        ctx.body = 'xxx'
    }

    static async delete(ctx) {
        const id = ctx.query.id
        let ope = await LinkClassProxy.updateById(id, {
            delete: true
        })
        ctx.body = ope
    }

    static async update(ctx) {

    }

    static async findByNavid(ctx) {
        const id = ctx.query.id
        let list = await LinkClassProxy.findByNavid(id);
        ctx.body = list;
    }
}