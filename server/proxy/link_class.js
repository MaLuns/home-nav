const { LinkClass } = require('../models');

module.exports = class LinkClassProxy {

    static async newAndSave(docs) {
        const linkclass = new LinkClass(docs);
        return linkclass.save()
    }

    static find(query) {
        return LinkClass.find(query, {})
    }

    static async findByTitle(title) {
        return LinkClass.findOne({ title }, {
            _id: 0,
            delete: 0
        })
    }

    static async updateById(id, doc) {
        return await LinkClass.updateOne({ _id: id }, { $set: doc }).catch(() => ({ ok: 0 }))
    }

    static async findByNavid(id) {
        // let doc = await LinkClass.find({ navID: id });
        return LinkClass.aggregate([
            {
                $match: {
                    navID: require('mongodb').ObjectID(id)
                }
            },
            {
                $lookup: {
                    from: 'link_info',
                    localField: "_id", // user 表关联的字段
                    foreignField: "classID", // order 表关联的字段
                    as: 'children'
                }
            }
        ])
    }
}
