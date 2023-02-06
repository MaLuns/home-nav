const mongoose = require('mongoose')
const config = require('../config.json')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_PATH, {
    //useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 20
}, (err) => {
    if (err) {
        console.error('connect to %s error: ', process.env.MONGODB_PATH, err.message)
        process.exit(1)
    }
})

module.exports = {
    Nav: require('./nav'),
    LinkClass: require('./link_class'),
    LinkInfo: require('./link_info'),
    User: require('./user'),
    Count: require('./count')
}