const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema(
    {
        count: Number,
        linkID: {
            type: mongoose.Types.ObjectId,
            ref: "link_info"
        },
        create_at: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'count'
    }
)

module.exports = mongoose.model('count', schema)