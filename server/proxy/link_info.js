const { LinkInfo } = require('../models');

module.exports = class LinkInfoProxy {

    static async newAndSave(docs) {
        const linkinfo = new LinkInfo(docs);
        return linkinfo.save()
    }

    static find(query) {
        return LinkInfo.find(query, {})
    }

    static async findByTitle(title) {
        return LinkInfo.findOne({ title }, {
            _id: 0,
            delete: 0
        })
    }

    static async updateById(id, doc) {
        return LinkInfo.updateOne({ _id: id }, { $set: doc })
    }
}
