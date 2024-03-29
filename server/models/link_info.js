const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema(
    {
        title: String,
        logo: String,
        url: String,
        desc: String,
        sort: {
            type: Number,
            default: 0
        },
        classID: {
            type: mongoose.Types.ObjectId,
            ref: "link_class"
        },
        status: {
            type: Number,
            default: 0 //0 未审核 1 已审核
        },
        remark: String,
        delete: {
            type: Boolean,
            default: false
        },
        createTime: {
            type: Date,
            default: Date.now
        },
        submitInfo: {
            type: Object
        }
    },
    {
        collection: 'link_info'
    }
)

module.exports = mongoose.model('LinkInfo', schema)