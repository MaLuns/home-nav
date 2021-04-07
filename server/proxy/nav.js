const { Nav } = require('../models');

module.exports = class NavProxy {

    static async newAndSave(docs) {
        const nav = new Nav(docs);
        return nav.save()
    }

    static find(query) {
        return Nav.find(query, {
            __v: 0
        }).sort({
            sort: 1
        })
    }

    static async findByTitle(title) {
        return Nav.findOne({ title }, {
            _id: 0,
            delete: 0
        })
    }

    static async updateById(id, doc) {
        return await Nav.updateOne({ _id: id }, { $set: doc }).catch(() => ({ ok: 0 }))
    }

}