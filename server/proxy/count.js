const { Count } = require('../models');
const { ObjectID } = require('mongodb')


module.exports = class CountProxy {

    static async update(id) {
        return Count.updateOne(
            { linkID: ObjectID(id) },
            {
                $inc: { count: 1 }
            },
            { upsert: true }
        )
    }
}