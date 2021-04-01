const { Number } = require('core-js')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema(
    {
        title: String,
        url: String,
        sort: Number,
        delete: {
            type: Boolean,
            default: false
        },
        blank: { // 
            type: Boolean,
            default: false
        },
        createTime: {
            type: Date,
            default: Date.now
        },
    },
    {
        collection: 'nav_info'
    }
)

module.exports = mongoose.model('Nav', schema)