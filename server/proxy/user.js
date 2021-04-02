const { User } = require('../models');

module.exports = class UserProxy {

    static find(query) {
        return User.findOne(query, {
            delete: 0,
            __v: 0
        })
    }

    static async updateById(id, doc) {
        return User.updateOne({ _id: id }, { $set: doc })
    }

    static async add(doc) {
        return new User(doc).save()
    }
}