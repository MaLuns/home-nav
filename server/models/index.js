const mongoose = require('mongoose')
const config = require('../../nuxt.config.js')
console.log(config.env.db)
mongoose.Promise = global.Promise
mongoose.connect(config.env.db, {
    //useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 20
}, (err) => {
    if (err) {
        console.error('connect to %s error: ', config.get('db'), err.message)
        process.exit(1)
    }
})

module.exports = {
    Nav: require('./nav'),
    LinkClass: require('./link_class'),
    LinkInfo: require('./link_info'),
}