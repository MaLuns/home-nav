const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema(
    {
        title: String,
        logo: String,
        url: String,
        desc: String,
        sort: Number,
        classID: {
            type: mongoose.Types.ObjectId,
            ref: "link_class"
        },
        delete: {
            type: Boolean,
            default: false
        },
        createTime: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'link_info'
    }
)

module.exports = mongoose.model('LinkInfo', schema)