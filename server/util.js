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
}