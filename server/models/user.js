const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema(
    {
        name: String,
        password: String,
        delete: {
            type: Boolean,
            default: false,
        },
        createTime: {
            type: Date,
            default: Date.now
        },
    },
    {
        collection: 'user'
    }
)

module.exports = mongoose.model('User', schema)