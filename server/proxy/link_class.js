const { LinkClass } = require('../models');
const { ObjectID } = require('mongodb')
module.exports = class LinkClassProxy {

    static async newAndSave(docs) {
        const linkclass = new LinkClass(docs);
        return linkclass.save()
    }

    static async find(query = {}, pages = {}) {
        if (pages.index && pages.size) {
            let count = await LinkClass.countDocuments(query)
            let list = await LinkClass.aggregate([
                { $match: query },
                { $skip: (pages.index - 1) * pages.size },
                { $limit: pages.size },
                {
                    $lookup: {
                        from: 'link_info',
                        localField: "_id", // link_class 表关联的字段
                        foreignField: "classID", // link_info 表关联的字段
                        as: 'children'
                    }
                },
                {
                    $lookup: {
                        from: 'nav_info',
                        localField: "navID", // link_class 表关联的字段
                        foreignField: "_id", // nav_info 表关联的字段
                        as: 'parent'
                    }
                },
                {
                    $unwind: { // 拆分成多条
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
                        desc: 1,
                        sort: 1,
                        title: 1,
                        allocation: { $toBool: "$navID" },
                        allocationStr: {
                            $cond: {
                                if: { $toBool: "$navID" },
                                then: '已分配',
                                else: '未分配'
                            }
                        },
                        parentTitle: '$parent.title',
                        count: { $size: '$children' }
                    }
                },

            ])
            return {
                count,
                list
            }
        } else {
            return LinkClass.find(query, {})
        }
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

    static async findByNavid(id) {
        return LinkClass.aggregate([
            {
                $match: {
                    navID: ObjectID(id),
                    delete: false
                }
            },
            {
                $lookup: {
                    from: 'link_info',
                    // localField: "_id", // user 表关联的字段
                    // foreignField: "classID", // order 表关联的字段
                    let: {
                        "id": "$_id"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            "$eq": [
                                                "$classID",
                                                "$$id"
                                            ]
                                        }
                                    ]
                                },
                                status: 1,
                                delete: false
                            }
                        }
                    ],
                    as: 'children'
                }
            },
            {
                $match: {
                    'children.0': {
                        $exists: true
                    }
                }
            }
        ])
    }

    static async deleteByIds(ids = []) {
        var _ids = ids.map(id => ObjectID(id))
        return LinkClass.deleteMany({
            _id: { $in: _ids }
        })
    }
}
