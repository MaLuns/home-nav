const { Nav } = require('../models');

module.exports = class NavProxy {

    static async newAndSave(docs) {
        const nav = new Nav(docs);
        return nav.save()
    }

    static find(query) {
        return Nav.find(query, {})
    }

    static async findByTitle(title) {
        return Nav.findOne({ title }, {
            _id: 0,
            delete: 0
        })
    }

    static async updateById(id, doc) {
        return Nav.update({ _id: id }, { $set: doc })
    }

}