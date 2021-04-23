const { Nav } = require('../models');

module.exports = class NavProxy {

    static async newAndSave(docs) {
        const nav = new Nav(docs);
        return nav.save()
    }

    static find(query) {
        return Nav.find(query, {
            delete: 1,
            blank: 1,
            title: 1,
            url: 1,
            sort: 1,
            isDesc: 1,
            createtime: {
                $dateToString: {
                    format: "%Y-%m-%d %H:%M:%S", date: "$createTime"
                }
            },
        }).sort({
            sort: 1
        })
    }

    static async updateManyByIds(ids = [], doc) {
        var _ids = ids.map(id => ObjectID(id))
        return await LinkClass.updateMany(
            {
                _id: { $in: _ids }
            },
            {
                $set: doc
            }
        )
    }

    static async updateById(id, doc) {
        return await Nav.update({ _id: id }, { $set: doc }).catch(() => ({ ok: 0 }))
    }

}