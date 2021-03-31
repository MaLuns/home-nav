const fs = require('fs')
const path = require('path')
const getQCJson = require('./qc')

getQCJson('http://www.qiachu.com/category-2.html').then(res => {
    let data = [{ "title": "排行", "icon": "", "children": res }]
    fs.writeFile(path.resolve(__dirname, '../static/mock/hot.json'), JSON.stringify(data), function (err) {
        if (err) console.log(err)
    })
})