const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema(
    {
        title: String,
        desc: String,
        sort: Number,
        navID: {
            type: mongoose.Types.ObjectId,
            ref: "nav_info"
        },
        createTime: {
            type: Date,
            default: Date.now
        },
        delete: {
            type: Boolean,
            default: false
        },
    },
    {
        collection: 'link_class'
    }
)

module.exports = mongoose.model('LinkClass', schema)