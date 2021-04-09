const bcrypt = require('bcryptjs')


module.exports = class Util {

    /**
     * 加密字符串
     * @param String str
     */
    static bhash(str) {
        return bcrypt.hashSync(str, 8)
    }

    /**
     * 对比原字符串与经过加密的字符串是否相同
     * @param String str
     * @param String hash
     */

    static bcompare(str, hash) {
        return bcrypt.compareSync(str, hash)
    }

    /**
     * 过滤Object属性
     * @param {*} obj 
     * @param {*} keys 
     */
    static objFilterKey(obj, keys = []) {
        let _obj = {}
        for (const key in obj) {
            if (keys.includes(key)) {
                _obj[key] = obj[key]
            }
        }
        return _obj;
    }

    /**
     * 生成MongoDB分页模糊查询 
     * @param {*} obj 
     * @param {*} page-key 
     */
    static pagesGeneration(obj, pages = ['size', 'index']) {
        let query = {}
        let page = {}
        for (const key in obj) {
            if (pages.includes(key)) {
                page[key] = parseInt(obj[key])
            } else {
                query[key] = {
                    $regex: obj[key], $options: 'i'
                }
            }
        }
        return [query, page];
    }
}