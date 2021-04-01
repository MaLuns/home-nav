const fs = require('fs')


String.prototype.replaceAll = function (str, str2) {
    return this.split(str).join(str2)
}

function write(poth, text) {
    fs.writeFile(poth, text, function (err) {
        if (err) console.log(err)
    });
}

module.exports = {
    write
}