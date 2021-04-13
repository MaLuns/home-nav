const { LinkInfo } = require('../models');
const { ObjectID } = require('mongodb')

module.exports = class LinkInfoProxy {

    static async newAndSave(docs) {
        const linkinfo = new LinkInfo(docs);
        return linkinfo.save()
    }

    static async find(query, pages) {
        if (pages.index && pages.size) {
            let count = await LinkInfo.countDocuments(query)
            let list = await LinkInfo.aggregate([
                { $match: query },
                { $skip: (pages.index - 1) * pages.size },
                { $limit: pages.size },
                {
                    $lookup: {
                        foreignField: "_id",
                        from: 'link_class',
                        localField: "classID",
                        as: 'parent'
                    }
                },
                {
                    $unwind: { //
                        path: "$parent",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $addFields: {
                        edit: false
                    }
                },
                {
                    $project: {
                        createTime: {
                            $dateToString: {
                                format: "%Y-%m-%d %H:%M:%S", date: "$createTime"
                            }
                        },
                        edit: 1,
                        delete: 1,
                        logo: 1,
                        url: 1,
                        desc: 1,
                        sort: 1,
                        title: 1,
                        status: 1,
                        remark: 1,
                        submitInfo: 1,
                        parentTitle: '$parent.title'
                    }
                },

            ])
            return {
                count,
                list
            }
        } else {
            return LinkInfo.find(query, {})
        }
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


    static async updateManyByIds(ids = [], doc) {
        var _ids = ids.map(id => ObjectID(id))
        return await LinkInfo.updateMany(
            {
                _id: { $in: _ids }
            },
            {
                $set: doc
            }
        )
    }
}
